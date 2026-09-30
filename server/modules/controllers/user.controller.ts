import { UserService } from "../services/user.service";
import { Router } from "express";

const router = Router();

const user = new UserService();

export const userRouter = router
  .get("/user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const person = await user.getOneUserById(userId);

    if (JSON.stringify(person.rows) == "[]") {
      res.status(404).json({
        description: "Пользователь не найден!",
      });
    }

    res.json({
      description: "Пользователь найден!",
      response: person.rows[0],
    });
  })

  .get("/user", async (req, res) => {
    const userId = Number(req.query.id);
    const person = await user.getOneUserById(userId);

    if (JSON.stringify(person.rows) == "[]") {
      res.status(404).json({
        description: "Пользователь не найден!",
      });
    }

    res.json({
      description: "Пользователь найден!",
      response: person.rows[0],
    });
  })

  .post("/user", async (req, res) => {
    const { name, password, email } = req.body;
    const getPersonExist = await user.getOneUser(name, password, email);

    if (getPersonExist.rows[0] != undefined) {
      return res
        .status(404)
        .json({ response: "Такой пользователь уже существует!" });
    }

    res.json({
      description: "Пользователь успешно создан!",
      response: (
        await user.addUser(req.body.name, req.body.password, req.body.email)
      ).rows[0],
    });
  })

  .get("/users", async (req, res) => {
    res.json({
      response: (await user.getUsers()).rows,
    });
  });
