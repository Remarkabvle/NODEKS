import { Product, validateProductData } from "../models/productModel.js";

class ProductController {
  async fetchAll(req, res) {
    try {
      const products = await Product.find()
        .populate([{ path: "userId", select: ["firstName", "userAlias"] }])
        .sort({ createdAt: -1 });

      if (!products.length) {
        return res.status(404).json({
          message: "No products found",
          status: "error",
          data: null,
        });
      }

      res.status(200).json({
        message: "Products retrieved successfully",
        status: "success",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching products",
        status: "error",
        data: null,
      });
    }
  }

  async addProduct(req, res) {
    try {
      const { error } = validateProductData(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: "warning",
          data: null,
        });
      }

      const imageUrls = req.files
        ? req.files.map((file) => `${req.protocol}://${req.get("host")}/upload/${file.filename}`)
        : [];

      const newProduct = await Product.create({
        ...req.body,
        userId: req.user._id,
        imageUrls,
      });

      res.status(201).json({
        message: "Product added successfully",
        status: "success",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while adding the product",
        status: "error",
        data: null,
      });
    }
  }

  async removeProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);

      res.status(200).json({
        message: "Product deleted successfully",
        status: "success",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the product",
        status: "error",
        data: null,
      });
    }
  }
}

export default new ProductController();
