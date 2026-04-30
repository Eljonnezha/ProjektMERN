const express = require("express");
const app = express();
const Stripe = require("stripe");

require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

app.post("/create-checkout-session", async (req, res) => {
  const { shport } = req.body;

  try {
    // krijojme sesionin e pageses ne Stripe me te dhenat e shportes 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: shport.map((item) => ({
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

    // Kthen tek frontend URL-në e sesionit Stripe Checkout per te drejtuar perdoruesin ne faqen e pageses
    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;