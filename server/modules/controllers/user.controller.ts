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

  .delete("/user/:id", async (req, res) => {
    const id = Number(req.params.id);
    const getUserExist = await user.getOneUserById(id);

    if (getUserExist.rows[0] == undefined) {
      return res.json({ response: "Такого пользователя не существует" });
    }

    await user.deleteUser(id);

    res.json({
      message: "Пользователь успешно удален!",
    });
  })

  .delete("/user", async (req, res) => {
    const id = Number(req.query.id);
    const getUserExist = await user.getOneUserById(id);

    if (getUserExist.rows[0] == undefined) {
      return res.json({ response: "Такого пользователя не существует" });
    }

    await user.deleteUser(id);

    res.json({
      message: "Пользователь успешно удален!",
    });
  })

  .patch("/user", async (req, res) => {
    const { id, patch, value } = req.body;
    const getUserExist = await user.getOneUserById(id);

    if (getUserExist.rows[0] == undefined) {
      return res.json({ response: "Такого пользователя не существует" });
    }

    await user.patchUser(id, patch, value);

    await res.json({ response: "Значение успешно изменено!" });
  })

  .get("/users", async (req, res) => {
    res.json({
      response: (await user.getUsers()).rows,
    });
  });
