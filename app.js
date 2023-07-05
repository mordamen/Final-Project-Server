require("./DB/connectToDb");
// require("./primeryData/primeryCards")();
const express = require("express");
const app = express();

const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const dateFormat = require("dateformat");

// Custom token for morgan logger
// morgan.token("timestamp", () => dateFormat(new Date(), "isoDateTime"));

// app.use(
//   morgan(
//     chalk.cyan("Timestamp: :timestamp, Method: :method, URL: :url, Status: :status, Response Time: :response-time ms"),
//     {
//       immediate: true,
//     }
//   )
// );

const customFormat = (tokens, req, res) => {
  return (
    "Method: " + chalk.green.bold(tokens.method(req, res)) +
    " " +
    "URL: " + chalk.yellow.bold(tokens.url(req, res)) +
    " " +
    "Status: " + chalk.blue.bold(tokens.status(req, res)) +
    " " +
    "Timestamp: " + chalk.white.bold("[" + new Date().toLocaleTimeString() + "]") +
    " " +
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

app.use(morgan(customFormat));

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(
    chalk.blueBright.bold(`Server running on: http://localhost:${PORT}`)
  )
);
