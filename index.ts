// -- Imports
import express from "express";

// -- Imports Routes
import userRouter from "./server/routes/user.routes";

const app = express();

// -- Use
app.use(express.json());
app.use(userRouter);

app.listen(2323);
