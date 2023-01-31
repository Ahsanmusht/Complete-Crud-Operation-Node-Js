const express = require('express');
const Blog_Router = express.Router();
const BlogController = require('../Controllers/Blog.Controller');



Blog_Router.get('/', BlogController.GetAllBlogs);
Blog_Router.post('/post',BlogController.PostBlog);
Blog_Router.put('/update/:id',BlogController.UpdateBlog);
Blog_Router.get('/:id', BlogController.GetById);
Blog_Router.delete('/:id', BlogController.DeleteBlog);
Blog_Router.get('/user/:id', BlogController.GetByUserId);


module.exports = Blog_Router; 