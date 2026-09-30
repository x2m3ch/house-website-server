// -- Imports
import express from "express";
import "dotenv/config";

// -- Imports Routes
import { userRouter } from "./server/modules/controllers/user.controller";

const app = express();
const port = process.env.PORT || 5000;

// -- Use
app.use(express.json());
app.use(userRouter);

app.listen(port);
