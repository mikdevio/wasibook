import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import indexRouter from "./routers/index.router.js";
import { mogoDBConnect, initializeDB } from "./config/db.js";

const app = express();
const port = 3000;

//middleware
app.use(cors()); // Cross origin resource sharing
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
