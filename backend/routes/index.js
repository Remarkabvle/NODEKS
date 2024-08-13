import express from "express";
import BlogsController from "../controllers/blogsController.js";
import ProductsController from "../controllers/productsController.js";
import UsersController from "../controllers/usersController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ownerMiddleware } from "../middleware/ownerMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Blog routes
router.get("/api/blogs", authMiddleware, adminMiddleware, BlogsController.fetchAll);
router.post("/api/blogs", authMiddleware, adminMiddleware, BlogsController.createBlog);
router.patch("/api/blogs/:id", BlogsController.modifyBlog);
router.delete("/api/blogs/:id", BlogsController.removeBlog);

// User routes
router.get("/api/profile", authMiddleware, UsersController.getProfile);
router.get("/api/users", UsersController.searchUsers);
router.get("/api/users/search", authMiddleware, ownerMiddleware, UsersController.searchUsers);
router.post("/api/users/sign-up", UsersController.register);
router.post("/api/users/sign-in", UsersController.login);
router.delete("/api/users/:id", UsersController.deleteUser);
router.patch("/api/users/:id", authMiddleware, ownerMiddleware, UsersController.updateUser);

// Product routes
router.get("/api/product", authMiddleware, ProductsController.fetchAll);
router.post("/api/product", authMiddleware, uploadMiddleware.array("rasm"), ProductsController.addProduct);
router.delete("/api/product/:id", ProductsController.removeProduct);

export default router;
