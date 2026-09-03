const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /cart - Add product to cart
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity is greater than available stock",
      });
    }

    const cartItem = new Cart({
      userId: req.user.userId,
      productId,
      quantity,
    });

    await cartItem.save();

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
});

// PUT /cart/:id - Update cart quantity
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Valid quantity is required",
      });
    }

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (cartItem.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this cart item",
      });
    }

    const product = await Product.findById(cartItem.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity is greater than available stock",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update cart",
      error: error.message,
    });
  }
});

// DELETE /cart/:id - Remove cart item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (cartItem.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this cart item",
      });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete cart item",
      error: error.message,
    });
  }
});

module.exports = router;