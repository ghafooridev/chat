import { Request, Response } from "express";
import {
  sendMessageService,
  getMessagesService
} from "../service/message";

export const sendMessage = async (req: any, res: Response): Promise<Response> => {
  try {
    const { content } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user.id;

    const messageData = { content, receiverId, senderId }

    const newMessage = await sendMessageService(messageData as any);
    return res.status(200).json(newMessage)
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
}

export const getMessages = async (req: any, res: Response): Promise<Response> => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.id;

    const messages = await getMessagesService(senderId, receiverId);
    return res.status(200).json(messages)
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
}

