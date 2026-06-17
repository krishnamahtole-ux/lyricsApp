const { readLyrics, writeLyrics } = require('../../../lib/data');
const { validateToken } = require('../../../lib/sessions');
const { v4: uuidv4 } = require('uuid');

function getTokenFromHeader(req) {
  const h = req.headers.authorization || '';
  const parts = h.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  return null;
}

module.exports = function handler(req, res) {
  if (req.method === 'GET') {
    const list = readLyrics();
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    const token = getTokenFromHeader(req);
    if (!validateToken(token)) return res.status(401).json({ error: 'unauthorized' });
    const { title, artist, content } = req.body || {};
    if (!title || !content) return res.status(400).json({ error: 'missing fields' });
    const list = readLyrics();
    const item = { id: uuidv4(), title, artist: artist || '', content, createdAt: Date.now() };
    list.unshift(item);
    writeLyrics(list);
    return res.status(201).json(item);
  }

  res.status(405).end();
};
