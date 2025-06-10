import express from 'express';
import {
    getUsers,
    getUser,
    deleteUser,
    getTotalUsersCount
} from '../controllers/userController/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/count/total", getTotalUsersCount);

export default userRouter;