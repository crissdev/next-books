import './load-env';
import path from 'path';
import { closeDb, requirePool } from './drizzle';
import { processEntities, withTransaction } from './seed-utils';
import type { Pool } from 'pg';

const BATCH_SIZE = 2000;
const DATA_FILE = path.resolve(process.env.AUTHORS_DATA_PATH || './lib/db/authors.json');
const CHECKPOINT_FILE = path.resolve(process.env.AUTHORS_CHECKPOINT_PATH || 'author_import_checkpoint.json');

// https://mcauleylab.ucsd.edu/public_datasets/gdrive/goodreads/goodreads_book_authors.json.gz
const TOTAL_AUTHORS = Number(process.env.TOTAL_AUTHORS || 4);

interface AuthorData {
  average_rating: string;
  author_id: string;
  text_reviews_count: string;
  name: string;
  ratings_count: string;
}

async function batchInsertAuthors(batch: AuthorData[], pool: Pool) {
  const insertQuery = `
    INSERT INTO authors (id, name, average_rating, text_reviews_count, ratings_count)
    VALUES ($1, $2, $3::numeric, $4::integer, $5::integer)
    ON CONFLICT (id) DO NOTHING
  `;

  await withTransaction(pool, async client => {
    for (const author of batch) {
      await client.query(insertQuery, [
        author.author_id,
        author.name,
        author.average_rating,
        author.text_reviews_count,
        author.ratings_count,
      ]);
    }
  });
}

async function main() {
  try {
    const pool = requirePool();
    const authorCount = await processEntities<AuthorData>(
      DATA_FILE,
      CHECKPOINT_FILE,
      BATCH_SIZE,
      batchInsertAuthors,
      pool,
      TOTAL_AUTHORS,
    );
    console.log(`Seeded ${authorCount.toLocaleString()} / ${TOTAL_AUTHORS.toLocaleString()} authors`);
  } catch (error) {
    console.error('Error seeding authors:', error);
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
