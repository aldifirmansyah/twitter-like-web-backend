const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { _id, username } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          _id
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        _id,
        username,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Something is wrong."
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { _id, username } = user;
    let token = jwt.sign(
      {
        _id
      },
      process.env.SECRET_KEY
    );
    return res.status(201).json({
      _id,
      username,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.setProfilePicture = async function(req, res, next) {
  try {
    req.user.profilePicture = req.file.buffer;
    await req.user.save();
    res.send();
  } catch {
    return next({
      status: 400
    });
  }
};

exports.getProfilePicture = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user | !user.profilePicture) throw new Error();

    res.set("Content-Type", "image/jpg");
    res.send(user.profilePicture);
  } catch {
    return next({
      status: 404
    });
  }
};
