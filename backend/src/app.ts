import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { Student } from "./entities/Student";
import { Standard } from "./entities/Standard";
import { Studentprofile } from "./entities/Studentprofile";
import { Parent } from "./entities/Parent";

const cors = require("cors");

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

const { studentsRouter } = require("./api/Students");
const { standardsRouter } = require("./api/Standards");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "postgres",
  entities: ["src/entities/*{.ts, .js}"],
  synchronize: true,
  logging: true,
});

export const studentRepo = AppDataSource.getRepository(Student);
export const profileRepo = AppDataSource.getRepository(Studentprofile);
export const parentRepo = AppDataSource.getRepository(Parent);
export const standardRepo = AppDataSource.getRepository(Standard);

app.get("/", (request, response) => {
  response.send("hello world");
});

app.use("/students", studentsRouter);
app.use("/standards", standardsRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Db successfully connected");

    app.listen(port, () => {
      console.log("running");
    });
  })
  .catch((err) => {
    console.log("error connecting db", err);
  });
