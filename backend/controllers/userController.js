import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


//get user login
const logintUser = async (req, res) => {

}

//get user register
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        //check if user already exists
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //validate email and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: "Password is not strong enough . Please use Capital letter, small letter, number and special character in password" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const newUser = new userModel({ name, email, password: hashedPassword });

        const savedUser = await newUser.save();
        const token = createtoken(savedUser._id);

        res.status(200).json({ success: true, message: "User created successfully", token });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

} 

//get admin login
const adminLogin = async (req, res) => {

}

export { logintUser, registerUser, adminLogin }