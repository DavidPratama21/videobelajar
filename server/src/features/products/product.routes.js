import { Router } from "express";
import * as ProductController from "./product.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);
router.post("/", authenticateToken, ProductController.createProduct);
router.put("/:id", authenticateToken, ProductController.updateProduct);
router.delete("/:id", authenticateToken, ProductController.deleteProduct);

export default router;
