import express from "express";

const app = express();

app.use(express.json());

type userType = { id: number; name: string; password: string };

let currentUserId = 1;
const USERS: userType[] = [];

class User {
  add = (name: string, password: string) => {
    USERS.push({ id: currentUserId, name: name, password: password });
    currentUserId += 1;
  };

  getById = (id: number) => USERS.find((user) => user.id === id);

  getByName = (name: string) => USERS.find((user) => user.name === name);
}

const user = new User();

user.add("Anton", "dwjfnmlkmw");

app
  .get("/user/:id", (req, res) => {
    const userId = Number(req.params.id);

    const findUserById = user.getById(userId);

    if (!findUserById) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(findUserById);
  })

  .get("/user", (req, res) => {
    const userId = Number(req.query.id);

    const findUserById = user.getById(userId);

    if (!findUserById) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(findUserById);
  })

  .post("/user", (req, res) => {
    const findUserName = user.getByName(req.body.name);

    if (!findUserName) {
      user.add(req.body.name, req.body.password);

      return res.json({
        message: "Пользователь добавлен!",
      });
    }

    res.status(404).json({
      message: "Пользователь с таким именем уже существует!",
    });
  });

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.listen(2323);
