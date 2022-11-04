const {
  PaymentController,
} = require("../../http/controllers/api/paymentController");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();

router.post("/payment", VerifyAccessToken, PaymentController.paymentGateway);
router.post("/verify", () => {});

module.exports = {
  ApiPayment: router,
};

//? main bank payment GateWay (sedad , shaparak , pasargad , saman , iranKish)
//! 1- Payment
//! 2- checkTransaction
//! 3- verifyTransaction

//? Interface payment GateWay (zarinPal , IDpay , DigiPay)
//! 1- Payment
//! 2- verifyTransaction
