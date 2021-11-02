import db from "../config/database.js";
import { Sequelize } from "sequelize";
const Transaction = db.define("transaction", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["Income", "Expense"]],
    },
    defaultValue: "Expense",
  },
  category: {
    type: Sequelize.STRING,
    unique: false,
    required: true,
  },

  amount: {
    type: Sequelize.INTEGER,
    unique: false,
    required: true,
  },

  note: {
    type: Sequelize.STRING,
    unique: false,
    required: false,
  },

  date: {
    type: Sequelize.DATE,
    unique: false,
    defaultValue: new Date(),
  },
});

export default Transaction;
