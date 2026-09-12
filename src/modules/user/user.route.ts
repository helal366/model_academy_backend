import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();
router.post("/create_user", userController.createuser)
export const userRouter:Router = router