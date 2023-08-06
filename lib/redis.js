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
  'Car',
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'text', textSearch: true  },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createCar(data) {
  await connect();

  const repository = new Repository(schema, client);

  const id = await repository.save(data);
  return id;
}

export async function getCar(id) {
  await connect();

  const repository = new Repository(schema, client);
  return repository.fetch(id);
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);
    await repository.createIndex()
}


export async function searchCars(q) {
    await connect();

    console.log(q);

    const repository = new Repository(schema, client);
    await repository.createIndex()

    const cars = await repository.search()
        .where('make').eq(q)
        .or('model').eq(q)
        .or('description').matches(q)
        .return.all();

    console.log(cars)
    return cars;
}