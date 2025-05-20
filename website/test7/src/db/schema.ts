import { pgSchema, serial, smallint, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const schema = pgSchema('test7');

export const contactTable = schema.table('t_contact', {
  id: serial('id').primaryKey(),
  entryClass: smallint('entry_class').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  zipCode: varchar('zip_code', { length: 10 }),
  address: varchar('address', { length: 200 }),
  tel: varchar('tel', { length: 20 }),
  email: varchar('email', { length: 100 }),
  serviceType: smallint('service_type'),
  propertyType: smallint('property_type'),
  area: varchar('area', { length: 100 }),
  contact: text('contact'),
  createdAt: timestamp('created_at').notNull(),
});

export const todoTable = schema.table('t_todo', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  isDone: smallint('is_done').notNull().default(0),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
