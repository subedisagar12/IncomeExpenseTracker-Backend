import { Sequelize } from "sequelize";

const db = new Sequelize("incomeexpensetracker", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default db;
