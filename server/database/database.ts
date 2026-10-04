import { DataSource } from "typeorm";
import { Users as users } from "./entitites/user.entity";
import "reflect-metadata";

export const database = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_BASE,

  entities: [users],
  logging: true,
  synchronize: true,
});

export const userRepo = database.getRepository(users);
