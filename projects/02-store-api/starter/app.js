require("dotenv").config();

require("express-async-errors");
const express = require("express");

const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const errorHandlerMiddleware = require("./middleware/error-handler");

const notFoundMiddleware = require("./middleware/not-found");
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">product routes</a>');
});

app.use("/api/v1/products", productRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.port || 3000;
const start = async () => {
  try {
    await connectDB();
    console.log("success");
    app.listen(PORT, console.log(`server is listeing on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
