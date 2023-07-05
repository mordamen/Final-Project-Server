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
morgan.token("timestamp", () => dateFormat(new Date(), "isoDateTime"));

app.use(
  morgan(
    chalk.cyan("Timestamp: :timestamp, Method: :method, URL: :url, Status: :status, Response Time: :response-time ms"),
    {
      immediate: true,
    }
  )
);


// Add CORS headers middleware
app.use((req, res, next) => {
  // Allow requests from a specific origin
  res.setHeader("Access-Control-Allow-Origin", "https://final-project-website-zeta.vercel.app");

  // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Allow custom headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow credentials (if needed)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

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
