const express = require("express");
const {
  signUpUser,
  getUser,
  editUser,
  signInUser,
  getAllUsers,
  removeUser,
} = require("../controller/controller");
const authentication = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signUpUser);
router.get("/getUser",authentication, getUser);
router.get("/getAllUsers",authentication,getAllUsers);
router.put("/editUser",authentication, editUser);
router.delete("/remove",removeUser);
router.put("/signin", signInUser);

module.exports = router;
