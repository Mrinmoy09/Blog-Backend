const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const date = Date.parse(req.body.date);

    const newBlog = new Blog({
    title,
    content,
    author,
    date,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a blog post by ID
exports.updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a blog post by ID
exports.deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
