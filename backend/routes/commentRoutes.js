import express from "express";
import {
    createComment,
    getAllComments,
    getComment,
    deleteComment,
    countComments
} from "../controllers/commentsController/commentsController.js";	


const commentRouter = express.Router();

commentRouter.post ("/:id", createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:userId/:commentId", deleteComment);
commentRouter.get("/count/all/comments", countComments);

export default commentRouter;