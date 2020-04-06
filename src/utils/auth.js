const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const newToken = user => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP
  });
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

// Authorization middleware
const Protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).end();
  }
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    res.status(401).send({ message: "Not authorized. Please log in" });
  }

  try {
    const validatedToken = await verifyToken(token);
    const user = await UserModel.findById(validatedToken.id)
      .lean()
      .select("-password")
      .exec();
    // put the user obj on the req obj
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

module.exports = { newToken, verifyToken, Protect };
