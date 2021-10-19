require("dotenv").config();
const connectDB = require("./db/connect");

const Product = require("./models/product");
const jsonProducts = require("./products.json");

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

    await Product.deleteMany({});
    await Product.insertMany(jsonProducts);

    console.log("seed success ✅");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
