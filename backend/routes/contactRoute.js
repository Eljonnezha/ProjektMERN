const express = require("express");
const app = express();
const contactModel = require("../models/contactModel");

// Create/ADD => post
app.post("/addContact", async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    // kontrollo nese jane bosh
    if (!fullName || !email || !subject || !message) {
      return res.status(400).send("All fields are required");
    }

    const newContact = new contactModel({
      fullName,
      email,
      subject,
      message,
    });

    await newContact.save();

    res.status(200).send(newContact);
    console.log("added");
  } catch (err) {
    res.status(500).send("Not add: " + err);
    console.log("Not add: " + err);
  }
});

app.get("/getContacts", async (req, res) => {
  try {
    const allMessages = await contactModel.find();
    res.status(200).send(allMessages);
    console.log("allMessages");
  } catch (err) {
    res.status(500).send("Not read messages: " + err);
    console.log("Not read messages: " + err);
  }

  app.delete("/deleteContact/:id", async (req, res) => {
    try{
      const { id} = req.params;
      await contactModel.findByIdAndDelete(id);
      res.status(200).send("Message deleted");
      console.log("Message deleted");
    }catch(err){
      res.status(500).send("Not delete message: " + err);
      console.log("Not delete message: " + err);
    }
  })
});

module.exports = app;
