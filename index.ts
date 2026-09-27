import express from "express";
import fs from "fs";
import path from "path";

import { User } from "./server/interfaces/User";

const app = express();

app.use(express.json());

const usersDir = path.join(__dirname, "users");

const fileExists = (fileName: string) =>
  fs.existsSync(path.join(usersDir, fileName));

type userType = { id: number; name: string; password: string };

let currentUserId = 1;

const users: userType[] = [];

const addUser = (name: string, password: string) => {
  users.push({ id: currentUserId, name: name, password: password });
  currentUserId += 1;
};

addUser("Anton", "dwjfnmlkmw");

app
  .get("/user/:id", (req, res) => {
    const userId = Number(req.params.id);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(user);
  })

  .get("/user", (req, res) => {
    const userId = Number(req.query.id);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(user);
  })

  .post("/user", (req, res) => {
    const userName = users.find((user) => user.name === req.body.name);

    if (!userName) {
      addUser(req.body.name, req.body.password);

      return res.json({
        message: "Пользователь добавлен!",
      });
    }

    res.json({
      message: "Пользователь с таким именем уже существует!",
    });
  });

app.get("/users", (req, res) => {
  res.json(users);
});

// ---------------------

app.listen(process.env.PORT);
