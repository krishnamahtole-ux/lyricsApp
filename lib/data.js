import { Redis } from '@upstash/redis';

// Initialize the database client using Vercel's automated env variables
const redis = Redis.fromEnv();
const REDIS_KEY = 'lyrics_list';

export async function readLyrics() {
  try {
    const data = await redis.get(REDIS_KEY);
    // If the database is empty, return an empty array []
    return data ? data : [];
  } catch (err) {
    console.error("Database read error:", err);
    return [];
  }
}

export async function writeLyrics(list) {
  try {
    await redis.set(REDIS_KEY, list);
    return true;
  } catch (err) {
    console.error("Database write error:", err);
    return false;
  }
}