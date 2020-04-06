const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectToMongoDB = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true
  });
};

module.exports = connectToMongoDB;
