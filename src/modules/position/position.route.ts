import { Router } from "express";
import { positionController } from "./position.controller";

const router = Router();
router.post("/create_position", positionController.createPosition)
export const positionRouter:Router = router;