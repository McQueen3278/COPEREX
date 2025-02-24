import { Router } from "express";
import { login } from "./auth.controller.js";
import { loginValidator } from "../middlewares/user.validator.js";

const router = Router();

router.post("/login", loginValidator, login)

export default router;