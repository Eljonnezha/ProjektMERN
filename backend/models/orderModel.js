const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
    phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  items: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],


  paymentId: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
