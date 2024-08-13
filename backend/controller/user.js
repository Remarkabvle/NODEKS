import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, validateUserData } from "../models/userModel.js";

const JWT_SECRET_KEY = "iskandar";

class UserController {
  async getProfile(req, res) {
    try {
      const userProfile = await User.findById(req.user._id);

      res.status(200).json({
        message: "Profile fetched successfully",
        status: "success",
        data: userProfile,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the profile",
        status: "error",
        data: null,
      });
    }
  }

  async searchUsers(req, res) {
    try {
      const { query = "", limit = 3 } = req.query;
      const searchTerm = query.trim();

      if (!searchTerm) {
        return res.status(400).json({
          message: "Please provide a search term",
          status: "error",
          data: null,
        });
      }

      const users = await User.find({
        $or: [
          { firstName: { $regex: searchTerm, $options: "i" } },
          { userAlias: { $regex: searchTerm, $options: "i" } },
        ],
      }).limit(limit);

      if (!users.length) {
        return res.status(404).json({
          message: "No users found",
          status: "error",
          data: null,
        });
      }

      res.status(200).json({
        message: "Users found",
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while searching for users",
        status: "error",
        data: null,
      });
    }
  }

  async register(req, res) {
    try {
      const { error } = validateUserData(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: "warning",
          data: null,
        });
      }

      const { userAlias, password } = req.body;

      const userExists = await User.findOne({ userAlias });
      if (userExists) {
        return res.status(400).json({
          message: "User already exists",
          status: "error",
          data: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        status: "success",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred during registration",
        status: "error",
        data: null,
      });
    }
  }

  async login(req, res) {
    const { userAlias, password } = req.body;

    const user = await User.findOne({ userAlias });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        status: "error",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid username or password",
        status: "error",
        data: null,
      });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      status: "success",
      data: { token, user },
    });
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const existingUser = await User.findOne({ userAlias: req.body.userAlias });

      if (existingUser && id !== existingUser._id.toString()) {
        return res.status(400).json({
          message: "Username is already taken",
          status: "error",
          data: null,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json({
        message: "User updated successfully",
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the user",
        status: "error",
        data: null,
      });
    }
  }
}

export default new UserController();
