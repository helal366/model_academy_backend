import { Router } from "express";
import { positionController } from "./position.controller";
import { validateZodSchema } from "../../middlewares/validate.zod.schema.js";
import { createPositionZodSchema } from "./position.zod.validation.js";

const router = Router();
router.post(
  "/create_position",
  validateZodSchema(createPositionZodSchema),
  positionController.createPosition,
);
export const positionRouter: Router = router;
