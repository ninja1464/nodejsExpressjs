const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  // console.log(username, password);
  if (!username || !password) {
    throw new CustomAPIError("please provide gmail and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token);

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNUmber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello,  ${req.user.username} don`,
    secret: `here is authorized token ${luckyNUmber}`,
  });
};

module.exports = { login, dashboard };
