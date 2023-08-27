import { createClient } from 'redis'
import { Schema, Repository } from 'redis-om';

console.log('connect to redis at', process.env.REDIS_URL)
const client = createClient({url: process.env.REDIS_URL});

client.on('error', (err) => console.log('Redis Client Error', err));

async function connect() {
  if (!client.isOpen) {
    await client.connect();
  }
}

let schema = new Schema(
  'Character',
  {
    name: { type: 'string' },
    character_type: { type: 'string' },
    player: { type: 'string' },
    saga: { type: 'string' },
    setting: { type: 'string' },
    covenant: { type: 'string' },
    current_year: { type: number },
    birth_year: { type: number },
    age: { type: number },
    size: { type: number },
    confidence_score: { type: number },
    confidence_points: { type: number },
    birth_name: { type: 'string' },
    gender: { type: 'string' },
    nationality: { type: 'string' },
    origin: { type: 'string' },
    religion: { type: 'string' },
    profession: { type: 'string' },
    height: { type: 'string' },
    weight: { type: 'string' },
    hair: { type: 'string' },
    eyes: { type: 'string' },
    handedness: { type: 'string' },
    description: { type: 'text', textSearch: true  },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createCharacter(data) {
  await connect();

  const repository = new Repository(schema, client);

  const id = await repository.save(data);
  return id;
}

export async function getCharacter(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.fetch(id);
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);
    await repository.createIndex()
}


export async function searchCharacters(q) {
    await connect();

    console.log(q);

    const repository = new Repository(schema, client);
    await repository.createIndex()

    const characters = await repository.search()
        .where('name').eq(q)
        .or('player').eq(q)
        .or('character_type').eq(q)
        .or('description').matches(q)
        .return.all();

    console.log(characters)
    return characters;
}