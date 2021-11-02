import { Router } from "express";
import { CreateUser, GetUser } from "../controller/UserController.js";

const userRoutes = Router();

userRoutes.post("/", CreateUser);
userRoutes.get("/", GetUser);

export default userRoutes;
