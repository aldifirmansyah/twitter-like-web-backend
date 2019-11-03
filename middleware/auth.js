require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.decodeToken = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        const user = await db.user.findOne({ _id: decoded._id, "tokens.token": token });

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

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};
