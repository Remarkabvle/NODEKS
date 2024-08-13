import { Articles, validateArticle } from 'C:/Users/abuba/Desktop/Finweet-Project/NewFolder/backend/models/blogSchema.js';

class BlogController {
  async fetchAll(req, res) {
    try {
      const allBlogs = await Articles.find()
        .populate([{ path: "userId", select: ["firstName", "userAlias"] }])
        .sort({ createdAt: -1 });

      if (!allBlogs.length) {
        return res.status(404).json({
          message: "No blogs found",
          status: "error",
          data: null,
        });
      }

      res.status(200).json({
        message: "Blogs retrieved successfully",
        status: "success",
        data: allBlogs,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching blogs",
        status: "error",
        data: null,
      });
    }
  }

  async createBlog(req, res) {
    try {
      const { error } = validateArticle(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: "warning",
          data: null,
        });
      }

      const newBlog = await Articles.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).json({
        message: "Blog created successfully",
        status: "success",
        data: newBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the blog",
        status: "error",
        data: null,
      });
    }
  }

  async removeBlog(req, res) {
    try {
      const { id } = req.params;
      await Articles.findByIdAndDelete(id);

      res.status(200).json({
        message: "Blog deleted successfully",
        status: "success",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the blog",
        status: "error",
        data: null,
      });
    }
  }

  async modifyBlog(req, res) {
    try {
      const { id } = req.params;
      const updatedBlog = await Articles.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        message: "Blog updated successfully",
        status: "success",
        data: updatedBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the blog",
        status: "error",
        data: null,
      });
    }
  }
}

export default new BlogController();
