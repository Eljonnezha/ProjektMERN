const express = require("express");
const app = express();

const Menu = require("../models/menuModel");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

app.post("/add-menu", upload.single("photo"), async (req, res) => {
  try {
    const newMenu = new Menu({
      ...req.body,
      photo: req.file.filename,
    });
    await newMenu.save();
    res.status(200).send(newMenu);
    console.log("Added item");
  } catch (err) {
    res.status(500).send("Not added item" + err);
    console.log("Not added item" + err);
  }
});

// Read all menu items
app.get("/get-menu", async (req, res) => {
  try {
    const menu = await Menu.find({});
    res.status(200).send(menu);
    console.log(menu);
  } catch (err) {
    res.status(500).send("Not added item" + err);
    console.log("Not added item" + err);
  }
});

//Read one menu item
app.get("/get-menu/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const menuOneItem = await Menu.findById({ _id: itemId });
    res.status(200).send(menuOneItem);
    console.log(menuOneItem);
  } catch (err) {
    res.status(500).send("Not added item" + err);
    console.log("Not added item" + err);
  }
});

app.delete("/delete-menu/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await Menu.findByIdAndDelete({ _id: itemId });
    res.status(200).send("Deleted item");
    console.log("Deleted item");
  } catch (err) {
    res.status(500).send("Not deleted item" + err);
    console.log("Not deleted item" + err);
  }
});

app.patch("/update-menu/:id", upload.single("photo") , async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemInfo = { ...req.body };
    if (req.file) {
      itemInfo.photo = req.file.filename;
    }
    const updatedMenu = await Menu.findByIdAndUpdate(
      itemId,
      { $set: itemInfo },
      { new: true },
    );
    res.status(200).send(updatedMenu);
    console.log(updatedMenu);
  } catch (err) {
    res.status(500).send("Not updated item" + err);
    console.log("Not updated item" + err);
  }
});


module.exports = app;