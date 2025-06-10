import express from 'express';
import {createUser} from '../controllers/authUserController/authUserController.js';

const authUserRouter = express.Router();

authUserRouter.post("/register", createUser);




export default authUserRouter;