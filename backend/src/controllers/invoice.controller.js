import Invoice from "../models/invoice.model.js";
import * as baseController from "../controllers/base.controller.js";
import Stripe from "stripe";

// TODO: Implement functionalities
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

export const payKushki = async (req, res) => {
  const { token, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api-uat.kushkipagos.com/card/v1/charges",
      {
        token: token,
        amount: {
          subtotalIva: 0,
          subtotalIva0: amount,
          ice: 0,
          iva: 0,
          currency: "USD",
        },
      },
      {
        headers: {
          "Private-Merchant-Id": process.env.KUSHKI_MERCHAND_ID,
          "Content-Type": "application/json",
        },
      }
    );

    res
      .status(200)
      .json({ data: response.data, message: "Payment completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const payStripe = async (req, res) => {
  const { amount } = req.body;

  // console.log("Received request to create payment intent with amount:", amount);

  if (!amount) {
    return res.status(400).send({ error: "Amount is required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (amount * 100).toFixed(0), // Asegúrate de que el monto esté en centavos
      currency: "usd",
    });

    // console.log("Payment Intent created:", paymentIntent);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
};
