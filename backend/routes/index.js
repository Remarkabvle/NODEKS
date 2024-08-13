import express from "express";
import BlogsController from "../controller/blog.js";
import ProductsController from "../controller/product.js";
import UsersController from "../controller/user.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { authMiddleware } from "../middleware/auth.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
import { uploadMiddleware } from "../middleware/uploader.js";

const router = express.Router();

// Blog routes
router.get("/api/blogs", [authMiddleware], adminMiddleware, BlogsController.fetchAll);
router.post("/api/blogs", [authMiddleware], adminMiddleware, BlogsController.createBlog);
router.patch("/api/blogs/:id", BlogsController.modifyBlog);
router.delete("/api/blogs/:id", BlogsController.removeBlog);

// User routes
router.get("/api/profile", [[authMiddleware]], UsersController.getProfile);
router.get("/api/users", UsersController.searchUsers);
router.get("/api/users/search", [authMiddleware], ownerMiddleware, UsersController.searchUsers);
router.post("/api/users/sign-up", UsersController.register);
router.post("/api/users/sign-in", UsersController.login);
router.delete("/api/users/:id", UsersController.deleteUser);
router.patch("/api/users/:id", [authMiddleware], ownerMiddleware, UsersController.updateUser);

// Product routes
router.get("/api/product", authMiddleware, ProductsController.fetchAll);
router.post("/api/product", [authMiddleware, uploadMiddleware.array("rasm")], ProductsController.addProduct);
router.delete("/api/product/:id", ProductsController.removeProduct);

export default router;
