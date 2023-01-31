const UserModel = require('../Models/User.Model');
const bcrypt = require('bcryptjs');

const GetAllUsers = async (req, res, next) => {
    let users;

    try {

        users = await UserModel.find();

    } catch (error) {
        return console.log(error);
    }
    if (!users) {
        return res.status(404).json({
            message: `No User Found!`
        })
    }

    return res.status(200).json({ users })
};

const Signup = async (req, res, next) => {

    const { name, email, password, age } = req.body;
    
    // ######################### FIND EXISTING USER!!!!
    let ExistingUser;
    
    try {
        
        ExistingUser = await UserModel.findOne({ email })
        
    } catch (error) {
        return console.log(error);
    }
    if (ExistingUser) {
        return res.status(400).json({
            message: `User Already Exists!`
        })
    }

    // ######################### CREATING NEW USER!!!!
    const HashedPassword = bcrypt.hashSync(password);

    const user = new UserModel({
        name,
        email,
        password : HashedPassword,
        age,
        blogs:[]
    });


    try {

        await user.save();

    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ user })
}

const Login = async(req, res, next) => {
    const {email, password} = req.body;
    
    // ######################### FIND EXISTING USER!!!!
    let ExistingUser;

    try {

        ExistingUser = await UserModel.findOne({ email })

    } catch (error) {
        return console.log(error);
    }
    if (!ExistingUser) {
        return res.status(404).json({
            message: `User Not Found!`
        })
    }


    const IsPasswordCorrect = bcrypt.compareSync(password, ExistingUser.password);

    if(!IsPasswordCorrect){
        return res.status(400).json({
            message: `Email or Password is Incorrect ! Check Again!`
        })
    }

    return res.status(200).json({
        message: `Login Successfully Done!`, user: ExistingUser
    })
    
}

module.exports = {
    GetAllUsers,
    Signup,
    Login
}