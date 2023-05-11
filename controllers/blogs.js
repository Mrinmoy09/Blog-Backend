const Blog = require('../models/Blog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//Create a User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to your database
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    // Send the token and user data back in the response
    res.status(201).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//login 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the password provided with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    // Send the token and user data back in the response
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};




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
