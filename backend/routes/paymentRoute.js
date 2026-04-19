const express = require("express");
const app = express();
const Stripe = require("stripe");

require("dotenv").config();

const stripe = new Stripe(process.env.SNIPE_SECRET);

app.post("/create-checkout-session", async (req, res) => {
  const { cart, customer } = req.body; // ✔ KËTU

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cart.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      success_url: "http://localhost:3000/menu?payment=success",
      cancel_url: "http://localhost:3000/menu?payment=cancel",
    });

    res.json({ url: session.url, customer }); // ✔ opsional
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
