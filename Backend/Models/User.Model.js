const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }]
},{timestamps:true});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;