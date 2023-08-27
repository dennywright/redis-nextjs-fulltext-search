import { createCharacter } from '../../lib/redis';

export default async function handler(req, res) {
    const id = await createCharacter(req.body);
    console.log(id)
    res.status(200).json({ id })
}