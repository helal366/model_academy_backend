import { Router } from "express";
import { roleController } from "./role.controller";

const router = Router();
router.post("/create_role", roleController.createRole);

export const roleRouter:Router = router;