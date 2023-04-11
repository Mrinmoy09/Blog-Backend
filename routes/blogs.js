const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require('../controllers/blogs');

// Routes
router.post('/blogs', createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.patch('/blogs/:id', updateBlogById);
router.delete('/blogs/:id', deleteBlogById);

module.exports = router;
