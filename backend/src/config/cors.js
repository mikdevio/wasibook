const corsOptions = {
  origin: [
    "https://localhost:5173",
    "https://js.stripe.com",
    "http://localhost:3000",
  ], // Lista de dominios permitidos
  methods: ["GET", "POST"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Permitir cookies
};

export default corsOptions;
