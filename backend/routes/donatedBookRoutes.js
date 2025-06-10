import express from 'express';
import {
    createDonatedBook,
    getDonatedBooks,
    getDonatedBook,
    deleteDonatedBook,
    countDonatedBooks
} from '../controllers/donatedBookController/donatedBookController.js';


const donatedBookRouter = express.Router();

donatedBookRouter.post("/new", createDonatedBook);
donatedBookRouter.get("/", getDonatedBooks);
donatedBookRouter.get("/:id", getDonatedBook);
donatedBookRouter.delete("/:id", deleteDonatedBook);
donatedBookRouter.get("/count/all", countDonatedBooks);

export default donatedBookRouter;