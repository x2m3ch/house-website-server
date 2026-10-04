import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import { userRepo } from "../../database/database";
import { Users } from "../../database/entitites/user.entity";
import { Request, Response } from "express";

export class UserController {
  getUserParam = async (req: Request, res: Response) => {
    try {
      const userInfo = await userRepo.findBy({ id: Number(req.params.id) });

      if (JSON.stringify(userInfo) == "[]") {
        return res
          .status(404)
          .json({ responce: "Такой пользователь не найден!" });
      }

      res.json(userInfo);
    } catch (e) {
      console.error(
        "Произошла ошибка при получении конкретного пользователя",
        e,
      );
    }
  };

  getUserQuery = async (req: Request, res: Response) => {
    try {
      const userInfo = await userRepo.findBy({ id: Number(req.query.id) });

      if (JSON.stringify(userInfo) == "[]") {
        return res
          .status(404)
          .json({ responce: "Такой пользователь не найден!" });
      }

      res.json(userInfo);
    } catch (e) {
      console.error(
        "Произошла ошибка при получении конкретного пользователя",
        e,
      );
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      res.json({
        response: await userRepo.find(),
      });
    } catch (e) {
      console.error("Произошла ошибка при получении всех пользователей", e);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const validationsErrors = validationResult(req);
      const { name, password, email } = req.body;
      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.PASSWORD_SALT),
      );
      const user = new Users();

      if (!validationsErrors.isEmpty()) {
        return res.status(404).json({
          responce: "Произошла ошибка при проверке валидации!",
          validationsErrors,
        });
      }

      user.name = name;
      user.password = String(hashPassword);
      user.email = email;

      await userRepo.save(user);

      res.json({
        responce: "Пользователь успешно добавлен!",
      });
    } catch (e) {
      console.error("Произошла ошибка создания пользователя!", e);
    }
  };

  deleteUserParams = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const userInfo = await userRepo.findBy({ id: userId });

      if (JSON.stringify(userInfo) == "[]") {
        return res
          .status(404)
          .json({ responce: "Такой пользователь не найден!" });
      }

      await userRepo.delete({ id: userId });

      res.json({ response: "Пользователь успешно удален!" });
    } catch (e) {
      console.error("Произошла ошибка при удалении пользователя!", e);
    }
  };

  deleteUserQuery = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.id);
      const userInfo = await userRepo.findBy({ id: userId });

      if (JSON.stringify(userInfo) == "[]") {
        return res
          .status(404)
          .json({ responce: "Такой пользователь не найден!" });
      }

      await userRepo.delete({ id: userId });

      res.json({ response: "Пользователь успешно удален!" });
    } catch (e) {
      console.error("Произошла ошибка при удалении пользователя!", e);
    }
  };

  patchUser = async (req: Request, res: Response) => {
    try {
      const validationsErrors = validationResult(req);
      const { userId, whatPatch, value } = req.body;
      const userInfo = await userRepo.findBy({ id: userId });
      const hashPassword: string = await bcrypt.hash(
        value,
        Number(process.env.PASSWORD_SALT),
      );

      if (!validationsErrors.isEmpty()) {
        return res.status(404).json({
          responce: "Произошла ошибка при проверке валидации!",
          validationsErrors,
        });
      }

      if (JSON.stringify(userInfo) == "[]") {
        return res
          .status(404)
          .json({ responce: "Такой пользователь не найден!" });
      }

      await userRepo.update(
        { id: userId },
        { [whatPatch]: whatPatch == "password" ? hashPassword : value },
      );

      res.json({
        responce: `Поле ${whatPatch} в id ${userId} успешно измененно!`,
      });
    } catch (e) {
      console.error(
        "Произошла ошибка при изменении параметра пользователя!",
        e,
      );
    }
  };
}

/*
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
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.PASSWORD_SALT),
    );
    const person = new users();

    person.name = name;
    person.password = String(hashPassword);
    person.email = email;

    body(name).notEmpty().withMessage("Имя пользователя не может быть пустым!");

    const validationsErrors = await validationResult(req);

    if (!validationsErrors.isEmpty()) {
      return res
        .status(404)
        .json({ responce: "Произошла ошибка", validationsErrors });
    }

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

    await userRepo.delete({ id: userId });

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

    await userRepo.delete({ id: userId });

    res.json({ response: "Пользователь успешно удален!" });
  })

  .patch("/user", async (req, res) => {
    const { userId, whatPatch, value } = req.body;
    const userInfo = await userRepo.findBy({ id: userId });
    const typesPatch = ["name", "password", "email"];
    const hashPassword = await bcrypt.hash(
      value,
      Number(process.env.PASSWORD_SALT),
    );

    if (JSON.stringify(userInfo) == "[]") {
      return res
        .status(404)
        .json({ responce: "Такой пользователь не найден!" });
    }

    if (!typesPatch.includes(whatPatch)) {
      return res.status(404).json({ response: "Такое поле не действительно!" });
    }

    await userRepo.update(
      { id: userId },
      { [whatPatch]: whatPatch == "password" ? hashPassword : value },
    );

    res.json({
      responce: `Поле ${whatPatch} в id ${userId} успешно измененно!`,
    });
  })

  .get("/users", async (req, res) => {
    res.json({
      response: await userRepo.find(),
    });
  });
*/
