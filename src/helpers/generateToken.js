const jwt = require("jsonwebtoken");

let accessKey = process.env.JWT_ACCESS_KEY;

const generateAccessToken = (payload) => {
  const verifyOpts = {
    expiresIn: "30d",
  };
  const accessToken = jwt.sign(payload, accessKey, verifyOpts);
  return accessToken;
};

module.exports = { generateAccessToken};
