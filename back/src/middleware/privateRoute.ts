import { findUserById } from './../service/user';
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const privateRoute = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized... No Token" })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized... Invalid Token" })
    }
    console.log(token, decodedToken)
    const findUser = await findUserById((decodedToken as any).userId);
    if (!findUser) {
      return res.status(401).json({ error: "User Not Found" })
    }
    req.user = findUser;
    next()

  }
  catch (e) {
    console.log('private route')
    return res.status(401).json({ error: "internal server error... " })
  }
}