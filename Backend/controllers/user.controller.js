const User = require("../model/user.model")
const bcrypt = require("bcryptjs")
const salt = 10;
const jwt=require("jsonwebtoken")

exports.store = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password=hashedPassword;
        const user = await User.create(req.body);
        return res.json({ status: 200, success: true, message: "User Created Successfully", user })
    }
    catch (err) {
        console.log(err)
    }
}
exports.login = async (req, res, next) => {
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            return res.json({message:"User not found",success:false,status:404})
        }
        const userFinded=await bcrypt.compare(password,user.password)
        if(userFinded){
            const token= jwt.sign({ id: user._id,exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'Abc12345');
            return res.json({ status: 200, success: true, message: "User Logged in Successfully",token })
        }   
        else{
            return res.json({status:400,message:"Password Incorrect",success:false})
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.index = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json({ status: 200, success: true, message: "users Fetched Successfully", users })
    }
    catch (err) {
        console.log(err)
    }
}

exports.get = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        return res.json({ status: 200, success: true, message: "user Fetched Successfully", user })
    }
    catch (err) {
        console.log(err)
    }
}


exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        return res.json({ status: 200, success: true, message: "user Deleted Successfully" })
    }
    catch (err) {
        console.log(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        return res.json({ status: 200, success: true, message: "user Updated Successfully", user })
    }
    catch (err) {
        console.log(err)
    }
}