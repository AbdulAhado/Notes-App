import e from "express";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import middleware from "../middleware/middleware.js";
const router = e.Router();

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;

        // Use User, not User.default
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.log("Throw error in auth.js", error);
        return res.status(500).json({ success: false, message: "Error in Registering" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use User, not User.default
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not exists" });
        }

        const checkPassword = await bcrypt.compare(password,user.password) 

        if(!checkPassword){
            return res.status(400).json({ success: false, message: "Wrong credentials." });
        }

        const token = jwt.sign({id : user._id},"secretkeyofnoteapp1234@#",{expiresIn: "5h"})

        return res.status(201).json({ success: true, token, user : {name : user.name}, message: "Login successfully" });
    } catch (error) {
        console.log("Throw error in auth.js", error.message);
        return res.status(500).json({ success: false, message: "Error in Loging in" });
    }

});

router.get('/verify',middleware, async (req,res) => {
        try {
    // req.user should be set by your middleware
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
})

export default router;