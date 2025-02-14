import path from "path";

export const home = (req, res) => {
  res.status(200).json({
    status: "Ok",
    message: "Welcome to Wasibook API v1.0.0",
  });
};

export const about = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "You can use me to get Wasibook data.",
  });
};

export const config = (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
};
