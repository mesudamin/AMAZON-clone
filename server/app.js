const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Safely initialize Stripe secret key
const stripeSecretKey = process.env.STRIPE_KEY;
if (!stripeSecretKey) {
  console.warn(
    '⚠️ WARNING: STRIPE_KEY is not defined in environment variables. ' +
    'Please add STRIPE_KEY in your Render dashboard environment variables.'
  );
}

const stripe = stripeSecretKey ? require('stripe')(stripeSecretKey) : null;

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Health check and root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Amazon Clone API Server is running successfully on Render!',
    stripeConfigured: Boolean(stripe),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

// Stripe Payment Intent Creation Route
// Accepts total via query parameter (?total=...) or request body ({ total: ... } or { amount: ... })
app.post('/payment/create', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: 'Stripe API key is not configured on this server. Please set STRIPE_KEY in your environment variables.'
      });
    }

    const total = parseInt(req.query.total || req.body?.total || req.body?.amount, 10);

    if (total && total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total), // ensure integer cents
        currency: 'usd',
      });

      return res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(400).json({
        message: 'Total amount must be greater than 0',
      });
    }
  } catch (error) {
    console.error('Payment Intent Creation Error:', error.message);
    return res.status(500).json({
      error: error.message || 'Failed to create Stripe payment intent',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Amazon Clone API Server listening on port ${PORT}`);
});

module.exports = app;
