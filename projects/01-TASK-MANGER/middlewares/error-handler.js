const { CustomAPIError } = require("../errors/cusom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.msg });
  }
  res.status(500).json({ msg: "something went wrong plz try later" });
};

module.exports = errorHandlerMiddleware;
