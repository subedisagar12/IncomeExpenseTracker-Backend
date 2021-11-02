import express from "express";
import {
  CreateTransaction,
  GetAllTransaction,
  GetSingleTransaction,
  GetAllTransactionByCategory,
  UpdateTransaction,
  DeleteTransaction,
} from "../controller/TransactionController.js";

const transactionRoutes = express.Router();

transactionRoutes.post("/", CreateTransaction);
transactionRoutes.get("/:from.:to", GetAllTransaction);
transactionRoutes.get("/:transactionId", GetSingleTransaction);
transactionRoutes.get("/transaction/:categoryId", GetAllTransactionByCategory);

transactionRoutes.put("/:transactionId", UpdateTransaction);
transactionRoutes.delete("/:transactionId", DeleteTransaction);

export default transactionRoutes;
