import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { conversationSchema } from "./conversation";
import { userSchema } from "./user";

export const userConversationSchema = pgTable("user_conversations", {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').notNull().references(() => userSchema.id),
    conversationId: uuid('conversationId').notNull().references(() => conversationSchema.id),
});


export type User = InferSelectModel<typeof userConversationSchema>
export type NewUser = InferInsertModel<typeof userConversationSchema>