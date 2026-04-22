const express = require("express");
const app = express();
const orderModel = require("../models/orderModel");

// shtojme porosit nga klienti
app.post("/addOrder", async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      phoneNumber,
      city,
      paymentMethod,
      totalAmount,
      items,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !address ||
      !phoneNumber ||
      !city ||
      !paymentMethod ||
      !totalAmount ||
      !items
    ) {
      return res.status(400).send("All fields are required");
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }

    const newOrder = new orderModel({
      fullName,
      email,
      address,
      phoneNumber,
      city,
      paymentMethod,
      totalAmount,
      items,
      orderDate: Date.now(),
    });

    await newOrder.save();
    res.status(200).send(newOrder);
    console.log("Order added");
  } catch (err) {
    res.status(500).send("Error adding order:" + err);
    console.log("Error adding order:" + err);
  }
});

// marrim porosit nga klienti
app.get("/getOrders", async (req, res) => {
  try {
    const allOrders = await orderModel.find();
    res.status(200).send(allOrders);
    console.log("All orders retrieved");
  } catch (err) {
    res.status(500).send("Error getting orders:" + err);
    console.log("Error getting orders:" + err);
  }
});

// fshijme nje porosi nga klienti
app.delete("/deleteOrder/:id", async (req, res) => {
    try{
        const orderId = req.params.id;
        await orderModel.findByIdAndDelete(orderId);
        res.status(200).send("Order deleted");
        console.log("Order deleted");
    }catch(err){
        res.status(500).send("Error deleting order:" + err);
        console.log("Error deleting order:" + err);
    }
})

module.exports = app;
