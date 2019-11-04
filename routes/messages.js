const express = require("express");
const { decodeToken } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../handlers/messages");

router.route("/").post(decodeToken, createMessage);

router
  .route("/:message_id")
  .get(getMessage)
  .delete(decodeToken, deleteMessage);

module.exports = router;
