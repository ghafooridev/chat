import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { conversationSchema } from "./conversation";

// export const messageSchema = pgTable('message', {
//     id: uuid('id').defaultRandom().primaryKey(),
//     senderId: uuid('senderId').notNull().references(() => userSchema.id),
//     receiverId: uuid('receiverId').notNull().references(() => userSchema.id),
//     message: varchar("message"),
//     createdAt: timestamp('createdAt').defaultNow().notNull(),
//     conversationId: uuid('conversationId').references(() => conversationSchema.id)
// })

export const messageSchema = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: varchar("content").notNull(),
    senderId: uuid("senderId").notNull().references(() => userSchema.id),
    receiverId: uuid("receiverId").notNull().references(() => userSchema.id),
    conversationId: uuid("conversationId").notNull().references(() => conversationSchema.id),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type Message = InferSelectModel<typeof messageSchema>
export type NewMessage = InferInsertModel<typeof messageSchema>