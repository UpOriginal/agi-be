require("dotenv");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT || 3100;
const server = express();

server.disable("x-powered-by");
server.use(express.json());
server.use(cors());
server.use(helmet());

server.listen(PORT, () => {
  console.log(`Agi Server running on http://localhost:${PORT}`);
});
