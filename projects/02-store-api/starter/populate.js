//require("dotenv").config;

const connectDB = require("./db/connect");

const products = require("./models/product");

const jsonproducts = require("./products.json");

const start = async () => {
  try {
    await connectDB();
    await products.deleteMany();
    await products.create(jsonproducts);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
start();
