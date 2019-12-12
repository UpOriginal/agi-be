const stripe = require("../utils/stripe");
const UserModel = require("../models/userModel");

exports.startSubscription = async (req, res) => {
  const newCustomer = req.body;
  console.log(newCustomer);
  return;
  const customer = await stripe.customers.create({
    payment_method: req.body.paymentMethod,
    email: req.body.email,
    invoice_settings: {
      default_payment_method: req.body.paymentMethod
    }
  });
  try {
    const updateUser = await UserModel.findOneAndUpdate(
      { email: customer.email },
      { stripe_id: customer.id },
      { new: true }
    )
      .lean()
      .exec();
    const subscription = await stripe.subscriptions.create({
      customer: updateUser.id,
      items: [{ plan: customer.plan }],
      expand: ["latest_invoice.payment_intent"]
    });
    res.status(200).send({ message: "Subscription created" });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
