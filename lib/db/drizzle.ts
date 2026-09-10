import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = connectionString ? new Pool({ connectionString }) : null;
export const db = pool ? drizzle(pool) : null;

export function requirePool() {
  if (!pool) throw new Error('DATABASE_URL environment variable is not set');
  return pool;
}

export function requireDb() {
  if (!db) throw new Error('DATABASE_URL environment variable is not set');
  return db;
}

export async function closeDb() {
  await pool?.end();
}
