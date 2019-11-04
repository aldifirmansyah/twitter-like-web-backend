const db = require("../models");

exports.createMessage = async function(req, res, next) {
  try {
    const message = new db.Message({
      user: req.user._id,
      text: req.body.text
    });
    await message.save();
    await message
      .populate("user", {
        username: true
      })
      .execPopulate();
    return res.status(201).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
