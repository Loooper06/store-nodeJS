const Controller = require("../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");

module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(httpStatus.OK).send("Index Page Store");
    } catch (err) {
      next(err);
    }
  }
})();
