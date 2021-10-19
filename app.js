require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1> <a href='/api/v1/products'>products route</a>");
});

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    const { MONGO_URI, DB_USERNAME, DB_PASSWORD } = process.env;
    const connectionString = MONGO_URI.replace(
      "<username>",
      DB_USERNAME
    ).replace("<password>", DB_PASSWORD);
    await connectDB(connectionString);
    console.log("Connected to database ✅");

    app.listen(port, console.log(`Server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
