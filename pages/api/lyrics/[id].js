const { readLyrics, writeLyrics } = require('../../../lib/data');
const { validateToken } = require('../../../lib/sessions');

function getTokenFromHeader(req) {
  const h = req.headers.authorization || '';
  const parts = h.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  return null;
}

module.exports = function handler(req, res) {
  const { id } = req.query;
  const list = readLyrics();
  const idx = list.findIndex((i) => i.id === id);
  if (req.method === 'GET') {
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    return res.status(200).json(list[idx]);
  }

  const token = getTokenFromHeader(req);
  if (!validateToken(token)) return res.status(401).json({ error: 'unauthorized' });

  if (req.method === 'PUT') {
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    const { title, artist, content } = req.body || {};
    if (!title || !content) return res.status(400).json({ error: 'missing fields' });
    list[idx] = { ...list[idx], title, artist: artist || '', content, updatedAt: Date.now() };
    writeLyrics(list);
    return res.status(200).json(list[idx]);
  }

  if (req.method === 'DELETE') {
    if (idx === -1) return res.status(404).json({ error: 'not found' });
    const removed = list.splice(idx, 1)[0];
    writeLyrics(list);
    return res.status(200).json({ ok: true, removed });
  }

  res.status(405).end();
};
