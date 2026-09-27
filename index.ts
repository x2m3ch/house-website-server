import express from "express";

const app = express();

app.use(express.json());

type userType = { id: number; name: string; password: string };

const USERS: userType[] = [];
let currentUserId = 1;

class User {
  add = (name: string, password: string) => {
    USERS.push({ id: currentUserId, name: name, password: password });
    currentUserId += 1;
  };
}

const user = new User();

user.add("Anton", "dwjfnmlkmw");

app
  .get("/user/:id", (req, res) => {
    const userId = Number(req.params.id);

    const user = USERS.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(user);
  })

  .get("/user", (req, res) => {
    const userId = Number(req.query.id);

    const user = USERS.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден!" });
    }

    res.json(user);
  })

  .post("/user", (req, res) => {
    const userName = USERS.find((user) => user.name === req.body.name);

    if (!userName) {
      user.add(req.body.name, req.body.password);

      return res.json({
        message: "Пользователь добавлен!",
      });
    }

    res.json({
      message: "Пользователь с таким именем уже существует!",
    });
  });

app.get("/users", (req, res) => {
  res.json(USERS);
});

// ---------------------

app.listen(process.env.PORT);
