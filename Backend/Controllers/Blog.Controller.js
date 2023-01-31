const { default: mongoose } = require('mongoose');
const BlogModel = require('../Models/Blog.Model');
const UserModel = require('../Models/User.Model');

const GetAllBlogs = async (req, res, next) => {
    let blogs;

    try {

        blogs = await BlogModel.find().populate("user");

    } catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({
            message: `No Blog Found!`
        })
    }
    return res.status(200).json({
        blogs
    })
};

const PostBlog = async (req, res, next) => {
    const { title, discription, image, user } = req.body;

    let ExistingUser;

    try {
        ExistingUser = await UserModel.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if (!ExistingUser) {
        return res.status(400).json({
            message: `Unable To Find User By This Id`
        })
    }

    const blog = new BlogModel({
        title,
        discription,
        image,
        user
    });

    try {

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });

        ExistingUser.blogs.push(blog);
        await ExistingUser.save({ session });

        await session.commitTransaction();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error

        })
    }

    return res.status(200).json({ blog })
}

const UpdateBlog = async (req, res, next) => {
    const { title, discription } = req.body;
    const blogId = req.params.id;
    let blog;

    try {

        blog = await BlogModel.findByIdAndUpdate(blogId, {
            title,
            discription
        });


    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(500).json({
            message: `Unable to Update Blog`
        })
    }

    return res.status(200).json({
        blog
    })

}

const GetById = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {

        blog = await BlogModel.findById(id);

    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({
            message: `Blog Not Found`
        })
    }

    return res.status(200).json({
        blog
    })
};

const DeleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {

        blog = await BlogModel.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();

    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(400).json({
            message: `Unable to Delete`
        })
    }

    return res.status(200).json({
        message: `Blog Deleted!`
    })
};

const GetByUserId = async(req, res, next) => {
    const UserId = req.params.id;

    let userBlogs;

    try {
        
        userBlogs = await UserModel.findById(UserId).populate("blogs");

    } catch (error) {
        return console.log(error);
    }

    if(!userBlogs){
        return res.status(404).json({
            message: `Blogs Not Found!`
        })
    }

    return res.status(200).json({user:userBlogs})
}

module.exports = {
    GetAllBlogs,
    PostBlog,
    UpdateBlog,
    GetById,
    DeleteBlog,
    GetByUserId
}