const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createUser,
  loginUser,
  createBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require('../controllers/blogs');

// Routes
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/blogs', auth, createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', auth, getBlogById);
router.patch('/blogs/:id', auth, updateBlogById);
router.delete('/blogs/:id', auth, deleteBlogById);

module.exports = router;
