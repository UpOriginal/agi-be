const UserModel = require("../models/userModel");
const { newToken } = require("../utils/auth");

exports.register = async (req, res) => {
  const userToRegister = req.body;
  if (
    !userToRegister.email ||
    !userToRegister.firstName ||
    !userToRegister.lastName ||
    !userToRegister.phoneNumber
  ) {
    res.status(400).send({ message: "Please fill out all required fields " });
  }
  try {
    const agent = await UserModel.create(userToRegister);
    res.status(201).json(agent.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Please fill in all required fields" });
  }
  const user = await UserModel.findOne({ email: email }).exec();
  if (!user) {
    res.status(401).end();
  }
  try {
    // check password and create token
    // @ts-ignore
    const valid = await user.checkPassword(password);
    if (!valid) {
      res.status(401).json({ message: "Invalid Password " });
    } else {
      // create token and send it to Front end
      const token = newToken(user);
      res.status(200).json({ message: "Success!", token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
