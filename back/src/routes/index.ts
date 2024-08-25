import { Router } from 'express';
import userRouter from "./user";
import messageRouter from "./message";

const createRouter = () => {
    const router = Router();
    router.use('/user', userRouter)
    router.use('/message', messageRouter)

    return router;
}

export default createRouter;