const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const LYRICS_FILE = path.join(DATA_DIR, 'lyrics.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(LYRICS_FILE)) fs.writeFileSync(LYRICS_FILE, '[]', 'utf8');
}

function readLyrics() {
  ensureDataDir();
  const raw = fs.readFileSync(LYRICS_FILE, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeLyrics(list) {
  ensureDataDir();
  fs.writeFileSync(LYRICS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

module.exports = { readLyrics, writeLyrics };
