import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// export const conversationSchema = pgTable('conversation', {
//     id: uuid('id').defaultRandom().primaryKey(),
//     createdAt: timestamp('createdAt').defaultNow(),
//     updatedAt: timestamp('updatedAt').defaultNow()
// })

export const conversationSchema = pgTable("conversations", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title").notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
});

export type Conversation = InferSelectModel<typeof conversationSchema>
export type NewConversation = InferInsertModel<typeof conversationSchema>