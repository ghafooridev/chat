import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { messageSchema } from "./message";
import { conversationSchema } from "./conversation";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { userConversationSchema } from "./userConversation";

// export const messageRelations = relations(messageSchema, ({ one }) => ({
//   conversation: one(conversationSchema, {
//     fields: [messageSchema.conversationId],
//     references: [conversationSchema.id]
//   }),
//   user: one(userSchema, {
//     fields: [messageSchema.senderId, messageSchema.receiverId],
//     references: [userSchema.id, userSchema.id]
//   })
// }))

// export const conversationRelations = relations(conversationSchema, ({ many }) => ({
//   message: many(messageSchema),
//   user: many(userConversationSchema)
// }))

// export const userRelations = relations(userSchema, ({ many }) => ({
//   message: many(messageSchema),
//   conversation: many(userConversationSchema)

// }))

// export const userConversationSchema = pgTable("user_conversation", {
//   id: uuid('id').defaultRandom().primaryKey(),
//   senderId: uuid('senderId').notNull().references(() => userSchema.id),
//   receiverId: uuid('receiverId').notNull().references(() => userSchema.id),
//   conversationId: uuid('conversationId').notNull().references(() => conversationSchema.id),
// }
// )

// export type UserConversation = InferSelectModel<typeof userConversationSchema>
// export type NewUserConversation = InferInsertModel<typeof userConversationSchema>


// export const userConversationRelation = relations(userConversationSchema, ({ one }) => ({
//   conversation: one(conversationSchema, {
//     fields: [userConversationSchema.conversationId],
//     references: [conversationSchema.id]
//   }),
//   sender: one(userSchema, {
//     fields: [userConversationSchema.senderId],
//     references: [userSchema.id]
//   }),
//   receiver: one(userSchema, {
//     fields: [userConversationSchema.receiverId],
//     references: [userSchema.id]
//   }),
// }))



// Message Relations
export const messageRelations = relations(messageSchema, ({ one }) => ({
  conversation: one(conversationSchema, {
    fields: [messageSchema.conversationId],
    references: [conversationSchema.id],
  }),
  sender: one(userSchema, {
    fields: [messageSchema.senderId],
    references: [userSchema.id],
  }),
  receiver: one(userSchema, {
    fields: [messageSchema.receiverId],
    references: [userSchema.id],
  }),
}));

// Conversation Relations
export const conversationRelations = relations(conversationSchema, ({ many }) => ({
  messages: many(messageSchema),
  users: many(userConversationSchema),
}));

// User Relations
export const userRelations = relations(userSchema, ({ many }) => ({
  // sentMessages: many(messageSchema, {
  //   fields: [messageSchema.senderId],
  //   references: [userSchema.id],
  // }),
  // receivedMessages: many(messageSchema, {
  //   fields: [messageSchema.receiverId],
  //   references: [userSchema.id],
  // }),
  sentMessages: many(messageSchema),
  receivedMessages: many(messageSchema),
  conversations: many(userConversationSchema),
}));

// User-Conversation Relations
export const userConversationRelations = relations(userConversationSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [userConversationSchema.userId],
    references: [userSchema.id],
  }),
  conversation: one(conversationSchema, {
    fields: [userConversationSchema.conversationId],
    references: [conversationSchema.id],
  }),
}));
