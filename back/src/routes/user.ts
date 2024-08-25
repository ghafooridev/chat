import { Router } from "express";
import {
  signIn,
  signUp,
  signOut,
  getUsers,
} from "../controller/user";
import { privateRoute } from "../middleware/privateRoute";


const userRouter = Router();

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.post('/signOut', signOut);
userRouter.get('/', privateRoute, getUsers);

export default userRouter;

