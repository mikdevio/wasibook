import app from "./app.js";
import { mogoDBConnect, initializeDB } from "./config/db.js";

const port = 3000;

// Database connection and initialization
mogoDBConnect()
  .then(() => initializeDB())
  .catch((err) => console.log("Database connection error:", err));

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
