const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cookieParser());
// register
app.post("/register", async (req, res) => {
  try {
    const userInfo = req.body;
    const findUser = await userModel.findOne({ email: userInfo.email });
    if (findUser) {
      return res.status(400).send("User exist");
    } else {
      const newUser = new userModel({
        ...req.body,
        password: bcrypt.hashSync(userInfo.password, 10),
      });
      await newUser.save();
      res.status(200).send(newUser);
    }
  } catch (err) {
    res.status(500).send("User not created " + err);
    console.log("user not register " + err);
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;
    const findUser = await userModel.findOne({ email: userInfo.email });
    if (findUser) {
      const passwordCompare = bcrypt.compareSync(
        userInfo.password,
        findUser.password,
      );
      if (passwordCompare) {
        const token = jwt.sign(
          {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
          },
          process.env.TOKEN_SECRET,
        );
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          })
          .json({
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
          });
      } else {
        res.status(400).send("user not found");
      }
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Not login");
  }
});

// user
app.get("/user", async (req, res) => {
  const { accessToken } = req.cookies;

  jwt.verify(accessToken, process.env.TOKEN_SECRET, {}, (err, info) => {
    if (err) {
      console.log("Unauthorized");
      res.status(401).send("Unauthorized");
    }
    res.status(200).send(info);
  });
});

// delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    res.status(200).send(user);
    console.log("User deleted");
  } catch (err) {
    res.status(500).send("Error deleting user:" + err);
    console.log("Error deleting user:" + err);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
    console.log("Users fetched");
  } catch (err) {
    res.status(500).send("Error fetching users:" + err);
    console.log("Error fetching users:" + err);
  }
});

// logout
app.post("/logout", async (req, res) => {
  res
    .cookie("accessToken", "", { expires: new Date(0), httpOnly: true })
    .json("Log out");
});
module.exports = app;
