import { userConversationSchema } from './../db/schema/userConversation';
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db";
import { conversationSchema } from "../db/schema/conversation";

export const createConversation = async (title: string) => {
  const newConversation = await db.insert(conversationSchema).values({
    title,
  }).returning();
  if (newConversation.length) return newConversation[0]
}

export const createUserConversation = async (conversationId: string, userIds: [string, string]) => {

  const userConversations = await db.insert(userConversationSchema).values(
    userIds.map(userId => ({
      userId: userId,
      conversationId,
    }))
  ).returning();

  if (userConversations.length) return userConversations[0]
}



export const findConversationId = async (senderId: string, receiverId: string) => {
  // Step 1: Find conversation IDs where both sender and receiver are participants
  const conversationIds = await db
    .select({
      conversationId: userConversationSchema.conversationId,
      userCount: sql`COUNT(${userConversationSchema.userId})`.as<number>(),
    })
    .from(userConversationSchema)
    .where(
      inArray(userConversationSchema.userId, [senderId, receiverId])
    )
    .groupBy(userConversationSchema.conversationId)
    .having(sql`COUNT(${userConversationSchema.userId}) = 2`)
    .then((rows) => rows);  // Resolve the promise and get the rows

  // Step 2: Check if the found conversations have exactly these two users
  for (const conv of conversationIds) {
    const participants = await db
      .select()
      .from(userConversationSchema)
      .where(eq(userConversationSchema.conversationId, conv.conversationId))
      .then((rows) => rows);  // Resolve the promise and get the rows

    const userIds = participants.map(uc => uc.userId);
    if (
      userIds.length === 2 &&
      userIds.includes(senderId) &&
      userIds.includes(receiverId)
    ) {
      return conv.conversationId; // Return the matching conversation ID
    }
  }

  return null; // No existing conversation found
}