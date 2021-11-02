import { Router } from "express";
import { Login } from "../controller/LoginController.js";

const loginRoutes = Router();

loginRoutes.post("/", Login);

export default loginRoutes;
