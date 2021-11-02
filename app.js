import express from "express";
import db from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { Authenticate } from "./middlewares/Authentication.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// Routes Import
import userRoutes from "./routes/UserRoutes.js";
import loginRoutes from "./routes/LoginRoutes.js";

import transactionRoutes from "./routes/TransactionRoutes.js";

app.use("/api/user", userRoutes);
app.use("/login", loginRoutes);

app.use("/api/transaction", Authenticate, transactionRoutes);

app.listen("8088", () => {
  console.log("Server started at port 8088");
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  await db.sync({ force: false });
  console.log("All models were synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
