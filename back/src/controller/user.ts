import { Router, Request, Response } from "express";

import {
  signUpService,
  signInService,
  signOutService,
  getUsersService,
}
  from "../service/user";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await signUpService(req.body, res);
    return res.status(200).json(user)
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
}

export const signIn = async (req: Request, res: Response) => {

  try {
    const user = await signInService(req.body, res);
    return res.status(200).json(user)
  }
  catch (e) {
    if (e instanceof Error) {
      const { message } = e;
      if (message === '401') return res.status(401).send('Invalid Crentional')

    }
  }
}

export const signOut = async (req: Request, res: Response) => {
  try {
    signOutService(res);
    return res.status(200).json({ message: "Logged out successfully" })
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
}

export const getUsers = async (req: any, res: Response) => {
  try {
    const senderId = req.user.id;
    const users = await getUsersService(senderId)
    return res.status(200).json(users)
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
}



