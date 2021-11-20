const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51Jpn9MSCY0kr9vLAnrZByZTuWeA25UhPnCWVgGFxp2aKwx5O8bSqgyMYt57MTFk5A4avZNLE68Fecpui6sNY4MKl00GRimXLun"
);
// API

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Api Routes
app.get("/", (req, res) => res.status(200).send("Hel lo World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request: ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen Commands
exports.api = functions.https.onRequest(app);
