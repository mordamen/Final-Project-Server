require("./DB/connectToDb");
const express = require("express");
const app = express();

const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");


const customFormat = (tokens, req, res) => {
  return (
    "Timestamp: " + chalk.white.bold(new Date().toLocaleTimeString()) +
    " | " +
    "Method: " + chalk.green.bold(tokens.method(req, res)) +
    " | " +
    "URL: " + chalk.yellow.bold(tokens.url(req, res)) +
    " | " +
    "Status: " + chalk.blue.bold(tokens.status(req, res)) +
    " | " +
    "Response Time: " + chalk.magenta.bold(tokens["response-time"](req, res) + " ms")
  );
};

// Add CORS headers middleware
const corsMiddleware = (req, res, next) => {
    // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
   // Allow specific HTTP methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
    // Allow custom headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    // Allow credentials (if needed)
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors());
app.use(express.json());

app.use(morgan(customFormat));

app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(
    chalk.blueBright.bold(`Server running on: http://localhost:${PORT}`)
  )
);
