import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./database/database.js";

import userRouter from "./routes/userRoutes.js";
import authUserRouter from "./routes/authUserRoutes.js";
import subscribeRouter from "./routes/subscribeRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import bookshelfRouter from "./routes/bookshelfRoutes.js";
import borrowedBookRouter from "./routes/borrowedBookRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import donatedBookRouter from "./routes/donatedBookRoutes.js";


dotenv.config();

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());


// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);



// base endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the BookLook API");
});

// Invalid endpoint
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

// Server Listener
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("Server is running on port http://localhost:7000/");
});

