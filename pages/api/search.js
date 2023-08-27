import { searchCharacters } from '../../lib/redis';

export default async function handler(req, res) {
  const q = req.query.q;
  const characters = await searchCharacters(q);
  res.status(200).json({ characters });
}
