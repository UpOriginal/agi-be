require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./src/routers/authRouter");
const stripeRouter = require("./src/routers/stripeRouter");
const agentDocsRouter = require("./src/routers/docsRouter");
const { Protect } = require("./src/utils/auth");

const PORT = process.env.PORT || 3100;
const server = express();

server.disable("x-powered-by");
server.use(express.json());
server.use(cors());
server.use(helmet());
// Routes
server.get("/", (req, res) => {
  res.send("Welcome to AGI America!");
});
// User Auth
server.use("/api/auth", authRouter);
server.use("/api/stripe", Protect, stripeRouter);
server.use("/api/docs", agentDocsRouter);
// Connect to mongo
connectDB()
  .then(dbConnect => {
    // @ts-ignore
    console.log("Db Connected", dbConnect.connections[0].name);
  })
  .catch(err => {
    console.log("DB Error", err);
  });

server.listen(PORT, () => {
  console.log(`Agi Server live: http://localhost:${PORT}`);
});
