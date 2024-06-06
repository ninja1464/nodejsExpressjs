const jwt = require("jsonwebtoken");
const CustomAPIError = require("../middleware/error-handler");

const authenticatorMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token found", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("not authorized to access this route", 401);
  }
};

module.exports = authenticatorMiddleware;
