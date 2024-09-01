import { getReceiverSocketId, io } from './../socket/index';
import { eq } from "drizzle-orm";
import { db } from "../db"
import { messageSchema, NewMessage } from '../db/schema/message';
import { createConversation, createUserConversation, findConversationId } from './conversation';

export const sendMessageService = async (body: NewMessage) => {
  const { senderId, receiverId } = body;
  let conversationId

  const findConversation = await findConversationId(senderId, receiverId)
  if (findConversation) {
    conversationId = findConversation
  }
  else {
    const conversation = await createConversation("new Conversation");
    conversationId = conversation?.id!;

    await createUserConversation(conversationId, [senderId, receiverId])
  }

  const newMessage = await db.insert(messageSchema).values({ ...body, conversationId }).returning();
  if (newMessage.length) {

    // add socket.io here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.emit("notification", newMessage);
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return newMessage[0]
  }
  else {
    throw new Error("MESSAGE FAILED")
  }
}


export const getMessagesService = async (senderId: string, receiverId: string) => {
  const findConversation = await findConversationId(senderId, receiverId)
  const messages = await db.select().from(messageSchema).where(eq(messageSchema.conversationId, findConversation as string))

  return messages
}
