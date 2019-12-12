const router = require("express").Router();
const stripe = require("../utils/stripe");

const stripeController = require("../controllers/stripeController");

router.route("/start-subscription").get(stripeController.startSubscription);
router.route("/charge").post(async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});
module.exports = router;
