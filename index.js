require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const userRoutes = require("./routes/user");
const messagesRoutes = require("./routes/messages");
const { decodeToken, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use(
  "/api/user/:id/messages",
  decodeToken,
  ensureCorrectUser,
  messagesRoutes
);

app.get("/api/messages", decodeToken, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS STARTING ON PORT ${PORT}`);
});
