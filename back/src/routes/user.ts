import { Router } from "express";
import {
  signIn,
  signUp,
  signOut,
  getUsers,
} from "../controller/user";
import { privateRoute } from "../middleware/privateRoute";


const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.post('/signout', signOut);
userRouter.get('/', privateRoute, getUsers);

export default userRouter;

