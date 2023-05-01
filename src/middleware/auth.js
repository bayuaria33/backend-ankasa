const jwt = require("jsonwebtoken");
let accessKey = process.env.JWT_ACCESS_KEY;

const protect = (req, res, next) => {
  try {
    let accessToken;
    if (req.headers.authorization) {
      let auth = req.headers.authorization;
      accessToken = auth.split(" ")[1];
      let decode = jwt.verify(accessToken, accessKey);
      req.payload = decode;
      next();
    } else {
      next(
        res
          .status(404)
          .json({
            status: 404,
            message: `Server access token not found, please login`,
          })
      );
      return;
    }
  } catch (error) {
    if (error && error.name == "JsonWebTokenError") {
      next(
        res
          .status(404)
          .json({
            status: 404,
            message: `Login failed, server token invalid`,
            data: error.message,
          })
      );
      return;
    } else if (error && error.name == "TokenExpiredError") {
      next(
        res
          .status(404)
          .json({
            status: 404,
            message: `Login failed, server token expired`,
            data: error.message,
          })
      );
      return;
    } else {
      next(
        res
          .status(404)
          .json({
            status: 404,
            message: `Login failed, please try again`,
            data: error.message,
          })
      );
      return;
    }
  }
};

module.exports = { protect };
