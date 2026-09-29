// -- Imports
import express from "express";

// -- Imports Routes
import { userRouter } from "./server/modules/controllers/user.controller";

const app = express();

// -- Use
app.use(express.json());
app.use(userRouter);

app.listen(2323);
