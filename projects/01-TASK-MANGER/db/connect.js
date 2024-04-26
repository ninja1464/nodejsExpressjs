// const mongoose = require("mongoose");

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewURLParser: true,
//      useCreateIndex: true,
//      useFindAndModify: false,
//      useUnifiedaTopology: true,
//    })
//  }
// // mongoose
// //   .connect(connectString)
// //   .then(() => {
// //     console.log("connected to the DB");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });


const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://chauhanbunty096:D9zZc6619GZfoXRG@nodeexpressprojects.pal2zus.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// connectToDatabase();

 module.exports = connectToDatabase;

