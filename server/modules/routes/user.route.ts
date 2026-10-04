import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { check } from "express-validator";

const router = Router();
const userController = new UserController();

export const userRouter = router
  .get("/user/:id", userController.getUserParam)

  .get("/user", userController.getUserQuery)

  .get("/users", userController.getUsers)

  .post(
    "/user",
    [
      check("name", "Имя пользователя не может быть пустым!").notEmpty(),
      check("password", "Пароль не может быть пустым!").notEmpty(),
      check("password", "Пароль не может быть короче 4 символов!").isLength({
        min: 4,
      }),
      check("email", "Почта не может быть пуста!").notEmpty(),
    ],
    userController.createUser,
  )

  .delete("/user/:id", userController.deleteUserParams)

  .delete("/user", userController.deleteUserQuery)

  .patch(
    "/user",
    [
      check("userId", "Айди не может быть пустым!").notEmpty(),
      check(
        "whatPatch",
        "Поле с тем, что изменить не может быть пустым!",
      ).notEmpty(),
      check(
        "value",
        "Поле с значением изменения не может быть пустым!",
      ).notEmpty(),
    ],
    userController.patchUser,
  );
