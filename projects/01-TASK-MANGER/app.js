const express = require("express");

const route = require("./routes/task.js");

const connectToDatabase = require("./db/connect.js");
const errorHandlerMiddleware = require("./middlewares/error-handler.js");

const notFound = require("./middlewares/not-found.js");

require("dotenv").config();
const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/1", route);
// const port = 3000;

app.use(notFound);
app.use(errorHandlerMiddleware);

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);

//     app.listen(port, console.log(`SERVER IS HITTING ON ${port}`));
//   } catch (error) {
//     console.log("error");
//   }
// };

// start();

// app.listen(port,console.log("boom boom"))

// app.listen(port, () => {
//   console.log("server is hitting on 3000");
// });

// Import the database connection function

async function startServer() {
  // const app = express();

  // Connect to the database
  try {
    await connectToDatabase();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return; // Exit the function if there's an error connecting to the database
  }

  //   Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Other routes and middleware can be defined here
}

// Call the async function to start the server
startServer()
  .then(() => {
    console.log("Server started successfully");
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
