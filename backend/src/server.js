import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import indexRouter from "./routers/index.router.js";
import { mogoDBConnect, initializeDB } from "./config/db.js";

const app = express();
const port = 3000;

// Configurar CORS
const corsOptions = {
  origin: "http://localhost:5173", // Asegúrate de que este sea el origen correcto
  credentials: true, // Permitir credenciales
};

//middleware
app.use(cors(corsOptions)); // Cross origin resource sharing
// Cookie-parser
app.use(cookieParser());
// Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Use of routers
app.use("/", indexRouter);

// Database connection
mogoDBConnect()
  .then(() => {
    // initializeDB().then(
    //   () => {console.log("MongoDB - Inserting data");}
    // );
  })
  .catch((err) => console.log(err));

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from ExpressJS" });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
