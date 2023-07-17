import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import type { SQLiteAdapter } from '.';
import type { Connect } from '../../database/types';

export const connect: Connect = async function connect(this: SQLiteAdapter) {
  const sqlite = new Database(this.filename, this.sqliteOptions);
  const db: BetterSQLite3Database = drizzle(sqlite);

  this.drizzle = db;
  return null;
};
