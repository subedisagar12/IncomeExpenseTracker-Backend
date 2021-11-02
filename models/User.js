import db from "../config/database.js";
import { Sequelize } from "sequelize";
const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  preferredCurrency: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["Rs.", "$"]],
    },
    defaultValue: "Rs.",
  },
});

export default User;
