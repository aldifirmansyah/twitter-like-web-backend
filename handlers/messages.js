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
    if (!message) throw new Error();
    return res.status(200).json(message);
  } catch (err) {
    return next({ status: 404 });
  }
};

exports.deleteMessage = async function(req, res, next) {
  try {
    const message = await db.Message.findOneAndDelete({
      _id: req.params.message_id,
      user: req.user._id
    });
    if (!message) throw new Error();
    return res.send();
  } catch (err) {
    return next({ status: 404 });
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    console.log(page);
    const messages = await db.Message.find({})
      .sort({ updatedAt: "desc" })
      .limit(10)
      .skip(10 * page);
    res.send(messages);
  } catch {
    return next({ status: 500 });
  }
};
