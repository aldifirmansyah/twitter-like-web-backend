const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  setProfilePicture,
  getProfilePicture
} = require("../handlers/user");
const { decodeToken } = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload jpg, jpeg, or png file"));
    }

    cb(undefined, true);
  }
});

router.post("", signup);
router.post("/signin", signin);
router.post(
  "/profilepicture",
  decodeToken,
  upload.single("photo"),
  setProfilePicture
);
router.get("/:id/profilepicture", getProfilePicture);

module.exports = router;
