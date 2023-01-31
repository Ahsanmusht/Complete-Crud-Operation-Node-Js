const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

const BlogModel = new mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;