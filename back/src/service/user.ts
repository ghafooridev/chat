import { NewUser, User, userSchema } from '../db/schema/user';
import { db } from "../db"
import { and, eq, ne } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { Response } from 'express';
import { getAvatar, setCookie } from '../utils';

export const findUserByEmail = async (email: string) => {
  const findUser = await db.query.userSchema.findFirst({
    where: (user, { eq }) => and(eq(user.email, email)),
  });
  return findUser
}

export const findUserById = async (id: string) => {
  const findUser = await db.query.userSchema.findFirst({
    where: (user, { eq }) => and(eq(user.id, id)),
  });
  return findUser
}


export const signUpService = async (body: User, res: Response): Promise<NewUser | undefined> => {
  const user = await db.select().from(userSchema).where(eq(userSchema.email, body.email));
  if (user.length) throw new Error("USER IS ALREADY EXIST");

  const avatar = getAvatar(body.firstName, body.lastName);

  const salt = await bcryptjs.genSalt(10)
  const password = await bcryptjs.hash(body.password, salt);

  const newUserData = { ...body, avatar, password }

  const newUser = await db.insert(userSchema).values(newUserData).returning();
  if (newUser.length) {
    setCookie(newUser[0].id, res);
    return newUser[0]
  }
  else throw new Error("USER IS INVALID");
}


export const signInService = async (body: Pick<User, "email" | "password">, res: Response): Promise<User | undefined> => {
  const findUser = await findUserByEmail(body.email)

  const validPassword = bcryptjs.compare(body.password, findUser?.password || "");

  if (!findUser || !validPassword) throw new Error("INVALID CREDENTIAL")


  setCookie(findUser.id, res)

  const user = await db.query.userSchema.findFirst({
    where: (user, { eq }) => and(eq(user.email, body.email)),
  })

  if (user) {
    setCookie(user.id, res);
    return user
  }
}

export const signOutService = async (res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return true
}

export const getUsersService = async (senderId: string) => {
  const users = await db.select({
    id: userSchema.id,
    firstName: userSchema.firstName,
    lastName: userSchema.lastName,
    avatar: userSchema.avatar
  }).from(userSchema)
    .where(ne(userSchema.id, senderId))
  console.log(users)
  return users
}