import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { SanitizedCollectionConfig } from '../../collections/config/types';
import { getVersionsModelName } from '../../versions/getVersionsModelName';
import type { SQLiteAdapter } from '.';
import type { Init } from '../../database/types';

export const init: Init = async function init(this: SQLiteAdapter,
  { config }) {
  this.payload.config.collections.forEach((collection: SanitizedCollectionConfig) => {
    const table = sqliteTable(collection.slug, {
      id: integer('id').primaryKey(),
      name: text('name'),
    });
  });

  this.payload.config.globals.forEach((global) => {
    // create model for each global
  });
};
