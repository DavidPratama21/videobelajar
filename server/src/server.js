import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./features/products/product.routes.js";
import userRoutes from "./features/users/users.routes.js";
import emailRoutes from "./features/emails/email.routes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [process.env.DEPLOY_URL, process.env.LOCAL_URL],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Ada yg ga beres", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Email
app.use("/", emailRoutes);
