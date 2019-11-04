const express = require("express");
const { decodeToken } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

const {
  createMessage,
  getMessage,
  deleteMessage,
  getAllMessages
} = require("../handlers/messages");

router
  .route("/")
  .post(decodeToken, createMessage)
  .get(decodeToken, getAllMessages);

router
  .route("/:message_id")
  .get(getMessage)
  .delete(decodeToken, deleteMessage);

module.exports = router;
