import { AnySQLiteColumn, SQLiteTableWithColumns, text, integer, uniqueIndex, AnySQLiteColumnBuilder } from 'drizzle-orm/sqlite-core';
import { SanitizedConfig } from '../../config/types';
import { Field, TextField, fieldAffectsData } from '../../fields/config/types';

type SQLiteTableWithColumnsGeneric = {
  name: string
  schema: string
  columns: Record<string, AnySQLiteColumn<unknown>>
}

type Args = {
  config: SanitizedConfig
  fields: Field[]
  tables: SQLiteTableWithColumns<SQLiteTableWithColumnsGeneric>[]
}

export const buildColumns = ({ config, fields, tables }: Args): Record<string, AnySQLiteColumnBuilder> => {
  const columns: Record<string, AnySQLiteColumnBuilder> = {};

  fields.forEach((field) => {
    const matchedColumn = fieldToColumnMap[field.type];

    if (matchedColumn && fieldAffectsData(field)) {
      columns[field.name] = matchedColumn(field);

      if ('required' in field && field.required) {
        columns[field.name].notNull();
      }
    }
  });

  return columns;
};

const fieldToColumnMap = {
  text: (field: TextField) => text(field.name),
};
