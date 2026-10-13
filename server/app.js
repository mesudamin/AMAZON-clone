const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with secret key
const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Base test route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success! Amazon server is running.',
  });
});

// Stripe Payment Intent Creation Route
// Supports total amount via query param (?total=...) or request body ({ total: ... })
app.post('/payment/create', async (req, res) => {
  try {
    const total = parseInt(req.query.total || req.body?.total || req.body?.amount);

    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // amount in lowest currency unit (cents for USD)
        currency: 'usd',
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        message: 'Total amount must be greater than 0',
      });
    }
  } catch (error) {
    console.error('Payment Error:', error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Amazon Server running on PORT: ${PORT}, http://localhost:${PORT}`);
});

module.exports = app;
