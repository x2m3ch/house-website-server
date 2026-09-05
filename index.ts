import express from "express";

const app = express();

app.get("/", (rec, res) => res.send("Hello"));

app.listen(2323);
