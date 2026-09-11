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

app
  .get("/reg", (rec, res) => {
    if (fileExists(`${rec.body.name}.json`)) {
      res.send(fs.readFileSync(path.join(usersDir, `${rec.body.name}.json`)));
    } else {
      res.status(404).send({ status: "Такого файла не существует" });
    }
  })

  .post("/reg", (rec, res) => {
    const user: User = {
      name: rec.body.name,
      password: rec.body.password,
    };

    const userJson = JSON.stringify(user).trim();

    if (fileExists(`${user.name}.json`)) {
      res.send({ status: "Такой файл уже существует" });
    } else {
      fs.writeFileSync(path.join(usersDir, `${user.name}.json`), userJson);
      res.send({ status: "Пользователь успешно создан" });
    }
  })

  .delete("/reg", (rec, res) => {
    if (fileExists(`${rec.body.name}.json`)) {
      fs.rmSync(path.join(usersDir, `${rec.body.name}.json`));
      res.send({ status: "Пользователь успешно удален!" });
    } else {
      res.send({ status: "Такого пользователя не существует" });
    }
  });

// ---------------------

app.listen(2323);
