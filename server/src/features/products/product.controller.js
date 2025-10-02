import * as ProductModel from "./product.model.js";

export async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.getProducts(req.query);
    res.json(products);
  } catch (err) {
    console.error("Err di getAllProducts: ", err);
    res.status(500).json({ message: err.message });
  }
}

export async function getSingleProduct(req, res) {
  try {
    const product = await ProductModel.getProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createProduct(req, res) {
  try {
    const product = await ProductModel.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await ProductModel.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    await ProductModel.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
