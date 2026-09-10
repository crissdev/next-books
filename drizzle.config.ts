import './lib/db/load-env';
import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './lib/db/migrations',
  schema: './lib/db/schema.ts',
} satisfies Config;
