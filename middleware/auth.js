import jsonwebtoken from "jsonwebtoken";
import logger from "./../middleware/logger.js";
import dotenv from "dotenv";
dotenv.config()
var Authentication = {
  async verifyToken(req, res,next) {
    var decoded;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.send({ "status": 0, "message": "Token is Mandatory" })
    }
    try {
      var decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
      console.log(decoded);
      req.user=decoded;
    } catch (err) {
      logger.info(` ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return res.send({ "status": 0, "message": "Error Authenticating User" })
    }
    return next();
  },
  async createToken(userId) {
    const token = jsonwebtoken.sign({ userId: userId },process.env.TOKEN_KEY);
    return token;
  }
}

export default Authentication;