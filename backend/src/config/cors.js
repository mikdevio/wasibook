const allowedOrigins = [
  "https://localhost:5173",
  "https://js.stripe.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin || "")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Permitir credenciales
};

export default corsOptions;
