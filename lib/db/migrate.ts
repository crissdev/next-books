import './load-env';
import path from 'path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { closeDb, requireDb } from './drizzle';

async function main() {
  try {
    await migrate(requireDb(), {
      migrationsFolder: path.join(__dirname, './migrations'),
    });
    console.log('Migrations complete');
  } finally {
    await closeDb();
  }
}

main();
