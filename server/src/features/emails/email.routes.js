import express from "express";
import { sendEmail, subscribeEmail } from "./email.controller.js";

const router = express.Router();

router.post("/send-email", sendEmail);
router.post("/subscribe", subscribeEmail);

export default router;
