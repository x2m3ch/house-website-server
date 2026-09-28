import { database } from "../../database/database";

export class userController {
  addUser = (name: string, password: string) =>
    database.query(
      `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *`,
      [name, password],
    );

  getOneUserById = (id: number) =>
    database.query(`SELECT * FROM users WHERE id = $1`, [id]);

  getOneUserByNameAndPassword = (name: string, password: string) =>
    database.query(
      `SELECT * FROM users WHERE (name = $1) AND (password = $2)`,
      [name, password],
    );

  getUsers = () => database.query("SELECT * FROM users");
}
