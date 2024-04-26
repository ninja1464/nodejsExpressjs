const mongoose = require("mongoose");



 function connectDB(){
  return mongoose.connect(
    "mongodb+srv://chauhanbunty096:D9zZc6619GZfoXRG@nodeexpressprojects.pal2zus.mongodb.net/STORE-API?retryWrites=true&w=majority",
    {
      
    }
  );
};

module.exports = connectDB;
