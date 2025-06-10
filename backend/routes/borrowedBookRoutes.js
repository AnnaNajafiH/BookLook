import express from 'express';
import {
    createBorrowedBook,
    getBorrowedBooks,
    getBorrowedBook,
    deleteBorrowedBook,
    countBorrowedBooks
} from '../controllers/borrowBookController/borrowBookController.js';

const borrowedBookRouter = express.Router();

borrowedBookRouter.post("/new", createBorrowedBook);
borrowedBookRouter.get("/", getBorrowedBooks);
borrowedBookRouter.get("/:id", getBorrowedBook);
borrowedBookRouter.delete("/:id", deleteBorrowedBook);
borrowedBookRouter.get("/count/all", countBorrowedBooks);

export default borrowedBookRouter;