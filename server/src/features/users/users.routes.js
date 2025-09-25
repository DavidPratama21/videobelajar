import { Router } from "express";
import * as UserController from "./users.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authenticateToken, UserController.getMe);
// router.put("/:id", authenticateToken, UserController.updateUser);
router.put("/me", authenticateToken, UserController.updateUser);

export default router;
