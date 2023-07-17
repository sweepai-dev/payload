import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type Database from 'better-sqlite3';
import { createMigration } from '../../database/migrations/createMigration';
import { migrate } from '../../database/migrations/migrate';
import { migrateDown } from '../../database/migrations/migrateDown';
import { migrateRefresh } from '../../database/migrations/migrateRefresh';
import { migrateReset } from '../../database/migrations/migrateReset';
import { migrateStatus } from '../../database/migrations/migrateStatus';
import type { DatabaseAdapter } from '../../database/types';
import type { Payload } from '../../index';
import { connect } from './connect';
import { init } from './init';
// import { create } from './create';
// import { find } from './find';
// import { findGlobalVersions } from './findGlobalVersions';
// import { findVersions } from './findVersions';
// import { queryDrafts } from './queryDrafts';
// import { webpack } from './webpack';

// import { createGlobal } from './createGlobal';
// import { createVersion } from './createVersion';
// import { deleteOne } from './deleteOne';
// import { deleteVersions } from './deleteVersions';
// import { findGlobal } from './findGlobal';
// import { findOne } from './findOne';
// import { updateGlobal } from './updateGlobal';
// import { updateOne } from './updateOne';
// import { updateVersion } from './updateVersion';

export interface Args {
  payload: Payload;
  drizzle: BetterSQLite3Database
  filename?: string | Buffer
  sqliteOptions?: Database.Options
  migrationDir?: string;
}

export type SQLiteAdapter = DatabaseAdapter &
  Args & {
    collections: {
      [slug: string]: unknown;
    };
    globals: unknown;
    versions: {
      [slug: string]: unknown;
    };
  };

export function sqliteAdapter({
  payload,
  migrationDir = '.migrations',
}: Args): SQLiteAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    payload,
    collections: {},
    versions: {},
    connect,
    init,
    // webpack,
    migrate,
    migrateStatus,
    migrateDown,
    migrateRefresh,
    migrateReset,
    migrateFresh: async () => null,
    migrationDir,
    createMigration: async (migrationName) => createMigration({ payload, migrationDir, migrationName }),
    transaction: async () => true,
    beginTransaction: async () => true,
    rollbackTransaction: async () => true,
    commitTransaction: async () => true,
    // queryDrafts,
    // findOne,
    // find,
    // create,
    // updateOne,
    // deleteOne,
    // findGlobal,
    // createGlobal,
    // updateGlobal,
    // findVersions,
    // findGlobalVersions,
    // createVersion,
    // updateVersion,
    // deleteVersions,
  };
}
