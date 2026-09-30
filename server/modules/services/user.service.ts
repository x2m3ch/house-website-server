import { database } from "../../database/database";

export class UserService {
  addUser = (name: string, password: string, email: string) =>
    database.query(
      `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *`,
      [name, password, email],
    );

  getOneUserById = (id: number) =>
    database.query(`SELECT * FROM users WHERE id = $1`, [id]);

  getOneUser = (name: string, password: string, email: string) =>
    database.query(
      `SELECT * FROM users WHERE (name = $1) AND (password = $2) AND (email = $3)`,
      [name, password, email],
    );

  getUsers = () => database.query("SELECT * FROM users");

  deleteUser = (id: number) =>
    database.query(`DELETE FROM users WHERE id = $1`, [id]);

  patchUser = (
    id: number,
    whatPatch: "name" | "password" | "email",
    newValue: string,
  ) =>
    database.query(`UPDATE users SET ${whatPatch} = $1 WHERE id = $2`, [
      newValue,
      id,
    ]);
}
