const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(`${process.env.ATLAS_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.magentaBright.bold("connected to MongoDb!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
