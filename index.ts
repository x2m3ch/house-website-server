import express from "express";
import fs from "fs";
import path from "path";

import { User } from "./server/interfaces/User";

const app = express();

app.use(express.json());

// ---------------------

const usersDir = path.join(__dirname, "users");

const fileExists = (fileName: string) =>
  fs.existsSync(path.join(usersDir, fileName));

// -----------------------

app.get("/", (rec, res) => res.send("Hello"));

app.post("/reg", (rec, res) => {
  const user: User = {
    name: rec.body.name,
    password: rec.body.password,
  };

  const userJson = JSON.stringify(user).trim();

  if (fileExists(`${user.name}.json`)) {
    res.send({ status: "Такой файл уже существует" });
  } else {
    fs.writeFile(path.join(usersDir, `${user.name}.json`), userJson, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ status: "Данные пользователя записаны в файл" });
      }
    });
  }
});

// ---------------------

app.listen(2323);
