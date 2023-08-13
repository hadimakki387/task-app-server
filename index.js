const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors"); // Import cors package
const cookieParser = require("cookie-parser")

const mongoose = require("mongoose");
app.use(express.json());
app.use(cookieParser())
app.use("*",cors({ credentials: true, origin: true})); // Enable CORS for all route


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/to-do-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.log("ERROR CONNECTING TO MONGODB!!: " + err);
});

const routers = require("./src/routes/routers");
app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
