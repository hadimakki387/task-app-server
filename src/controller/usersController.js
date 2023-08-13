const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  
    try {
        const userCheck = await User.findOne({ email: req.body.values.email });
        if (userCheck) {
          console.log("User found");
          return res.status(409).json({ error: "User already exists" });
        }
    
        const hashedPass = await bcrypt.hash(req.body.values.password, 10);
    
        const user = new User({
          name: req.body.values.name,
          email: req.body.values.email,
          password: hashedPass,
        });
        const savedUser = await user.save();
        const { password, ...data } = savedUser.toJSON();
    
        const token = jwt.sign({ id: data._id }, 'your-secret-key');
    
        res.status(201).json({ message: "User successfully registered", user: data, token: token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}


const signIn = async (req, res) => {
    console.log(req.body);
    
  }

module.exports = {signUp,signIn}