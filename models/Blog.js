const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const BlogSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', BlogSchema, 'blogPosts');

module.exports = Blog;
