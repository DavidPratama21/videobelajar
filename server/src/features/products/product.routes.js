import { Router } from "express";
import * as ProductController from "./product.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const router = Router();

// router.get("/", ProductController.getAllProducts);
// router.get("/:id", ProductController.getSingleProduct);
// router.post("/", ProductController.createProduct);
// router.put("/:id", ProductController.updateProduct);
// router.delete("/:id", ProductController.deleteProduct);

router.get("/", authenticateToken, ProductController.getAllProducts);
router.get("/:id", authenticateToken, ProductController.getSingleProduct);
router.post("/", authenticateToken, ProductController.createProduct);
router.put("/:id", authenticateToken, ProductController.updateProduct);
router.delete("/:id", authenticateToken, ProductController.deleteProduct);

export default router;
