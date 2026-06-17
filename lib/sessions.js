const { v4: uuidv4 } = require('uuid');

const sessions = new Map();

function createSession() {
  const token = uuidv4();
  sessions.set(token, { createdAt: Date.now() });
  return token;
}

function validateToken(token) {
  if (!token) return false;
  return sessions.has(token);
}

function revokeToken(token) {
  sessions.delete(token);
}

module.exports = { createSession, validateToken, revokeToken };
