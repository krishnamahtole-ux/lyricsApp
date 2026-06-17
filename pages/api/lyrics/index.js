import { readLyrics, writeLyrics } from '../../../lib/data';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const lyrics = await readLyrics();
    return res.status(200).json(lyrics);
  }

  if (req.method === 'POST') {
    const lyrics = await readLyrics();
    const newLyric = req.body;
    
    lyrics.push(newLyric);
    await writeLyrics(lyrics);
    
    return res.status(201).json({ message: 'Success' });
  }

  return res.status(405).end();
}