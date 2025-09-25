import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import { runMigrations } from './db/migrate.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await runMigrations();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Migration error:', err.message);
  }

  const server = http.createServer(app);
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

start();


