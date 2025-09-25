import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function tryConnect(password) {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: 'root',
      password,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      multipleStatements: true,
    });
    return conn;
  } catch (err) {
    return null;
  }
}

async function main() {
  const candidates = [process.env.MYSQL_ROOT_PASSWORD, '123456', '']
    .filter((v) => v !== undefined);

  let conn = null;
  for (const pwd of candidates) {
    // eslint-disable-next-line no-console
    console.log('Attempting MySQL root login with password length:', pwd?.length || 0);
    // eslint-disable-next-line no-await-in-loop
    const c = await tryConnect(pwd);
    if (c) {
      conn = c;
      break;
    }
  }

  if (!conn) {
    // eslint-disable-next-line no-console
    console.error('Could not connect as MySQL root with provided candidates.');
    process.exit(1);
  }

  const dbName = process.env.DB_NAME || 'campus_events';
  const user = process.env.DB_USER || 'campus_user';
  const pass = process.env.DB_PASSWORD || '123456';

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await conn.query(`CREATE USER IF NOT EXISTS '${user}'@'localhost' IDENTIFIED BY '${pass}'`);
  await conn.query(`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${user}'@'localhost'`);
  await conn.query('FLUSH PRIVILEGES');
  await conn.end();

  // eslint-disable-next-line no-console
  console.log('Database and user setup complete.');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


