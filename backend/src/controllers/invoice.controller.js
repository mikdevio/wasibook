import Invoice from "../models/invoice.model.js";
import * as baseController from "../controllers/base.controller.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getItem = (req, res) => {
  baseController.getItem(Invoice, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Invoice, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(Invoice, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Invoice, req, res);
};

export const uptadeItem = (req, res) => {
  baseController.updateItem(Invoice, req, res);
};

export const deleteItem = (req, res) => {
  baseController.deleteItem(Invoice, req, res);
};

export const generateReport = (req, res) => {
  baseController.generateReport(Invoice, req, res);
};

export const payStripe = async (req, res) => {
  const { amount, customer, email } = req.body;

  console.log("Received request to create payment intent with amount:", amount);

  if (!amount) {
    return res.status(400).send({ error: "Amount is required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (amount * 100).toFixed(0), // Asegúrate de que el monto esté en centavos
      currency: "usd",
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment Intent created:", paymentIntent);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
};
