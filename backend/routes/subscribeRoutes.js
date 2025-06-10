import express from "express";
import { subscriptionAdd } from "../controllers/subscriptionController/subscriptionController.js";


const subscribeRouter = express.Router();

subscribeRouter.post("/new", subscriptionAdd);

export default subscribeRouter;
