const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  
  try {
    const userCheck = await User.findOne({ email: req.body.email });

    console.log(userCheck);
    if (userCheck) {
      console.log("User found");
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    const savedUser = await user.save();

    const { password, ...data } = savedUser.toJSON();
    const token = jwt.sign({ id: data._id }, "hello");

    res
      .status(201)
      .json({
        message: "User successfully registered",
        user: data,
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
};

const checkAuth = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(404).json({ error: "unauthorized" });
  }

  try {
    const claims = jwt.verify(token, "hello");
    if (!claims) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const { password, ...data } = await User.findOne({ _id: claims.id });

    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "invalid token" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp, signIn, checkAuth };
