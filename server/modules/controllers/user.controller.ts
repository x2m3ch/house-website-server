import { Router } from "express";
import { userRepo } from "../../database/database";
import { users } from "../../database/entitites/user.entity";

const router = Router();

export const userRouter = router
  .get("/user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const userInfo = await userRepo.findBy({ id: userId });

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    res.json(userInfo);
  })

  .get("/user", async (req, res) => {
    const userId = Number(req.query.id);
    const userInfo = await userRepo.findBy({ id: userId });

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    res.json(userInfo);
  })

  .post("/user", async (req, res) => {
    const { name, password, email } = req.body;

    const person = new users();

    person.name = name;
    person.password = password;
    person.email = email;

    await userRepo.save(person);

    res.json({
      responce: "Пользователь успешно добавлен!",
    });
  })

  .delete("/user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const userInfo = await userRepo.findBy({ id: userId });

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    userRepo.delete({ id: userId });

    res.json({ response: "Пользователь успешно удален!" });
  })

  .delete("/user", async (req, res) => {
    const userId = Number(req.query.id);
    const userInfo = await userRepo.findBy({ id: userId });

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    userRepo.delete({ id: userId });

    res.json({ response: "Пользователь успешно удален!" });
  })

  .patch("/user", async (req, res) => {
    const { userId, whatPatch, value } = req.body;
    const userInfo = await userRepo.findBy({ id: userId });
    const typesPatch = ["name", "password", "email"];

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    if (!typesPatch.includes(whatPatch)) {
      return res.status(404).json({ response: "Такое поле не действительно!" });
    }

    userRepo.update({ id: userId }, { [whatPatch]: value });

    res.json({
      responce: `Поле ${whatPatch} в id ${userId} успешно измененно!`,
    });
  })

  .get("/users", async (req, res) => {
    console.log(userRepo.find());

    res.json({
      response: await userRepo.find(),
    });
  });
