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
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ message: "invalid credentials" });
      }
      const { password, ...data } = await user.toJSON();
      console.log(data);
      const token = jwt.sign({ id: user._id }, "hello");
  
      res.json({ message: "succes", token: token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = {signUp,signIn}