require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.decodeToken = async function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
      if (decoded) {
        const user = await db.User.findOne({
          _id: decoded._id
        });
        if (!user) {
          throw new Error();
        }

        req.token = token;
        req.user = user;

        return next();
      } else {
        throw new Error();
      }
    });
  } catch {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
};
