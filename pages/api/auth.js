const { createSession } = require('../../lib/sessions');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
  console.log("RECEVID:", passworrd, "EXPECTED:",ADMIN_PASSWORD);
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const token = createSession();
  res.status(200).json({ token });
};
