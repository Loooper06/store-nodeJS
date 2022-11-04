const Controller = require("../controller");

class PaymentController extends Controller {
  paymentGateway(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  PaymentController: new PaymentController(),
};
