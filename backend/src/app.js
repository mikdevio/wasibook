import cors from "cors";
import express from "express";
import corsOptions from "./config/cors.js";
import bodyParserMiddleware from "./middlewares/bodyParser.js";
import cookieParserMiddleware from "./middlewares/cookieParser.js";

import indexRouter from "./routers/index.router.js";

const app = express();

// CORS Settings
app.use(cors(corsOptions));

// Middleware
bodyParserMiddleware(app);
cookieParserMiddleware(app);

// Use of routers
app.use("/", indexRouter);

export default app;
