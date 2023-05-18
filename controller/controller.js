require("dotenv").config();

const connection = require("../model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const user = await connection.find(
    { email: `${req.body.userEmail}` },
    "-password"
  );

  if (!user.length > 0) {
    const hashPassword = await bcrypt.hash(userPassword, 10);
    connection
      .insertMany({ name: userName, email: userEmail, password: hashPassword })
      .then(() =>
        res.send({ userCreated: true, message: "User Created successfully" })
      )
      .catch((e) =>
        res.send({ userCreated: false, message: "User Not created" })
      );
  } else {
    res.send({ userCreated: false, message: "This Email Already Exists" });
  }
};

const getUser = async (req, res) => {
  const user = await connection.find(
    { email: `${req.body.userEmail}` },
    "-password"
  );
  if (user.length > 0) {
    res.send({ user: user });
  } else {
    res.send({ message: "user Not Found" });
  }
};

const getAllUsers = async (req, res) => {
  const user = await connection.find({}, "-password");
  if (user) {
    res.send({ user: user });
  } else {
    res.send({ message: "No users found" });
  }
};

const editUser = async (req, res) => {
  const user = await connection.find(
    { email: `${req.body.userEmail}` },
    "-password"
  );

  if (user.length > 0) {
    await connection.updateMany(
      { email: req.body.userEmail },
      { $set: { name: req.body.userName } }
    );
    res.send({ message: "User Updated successfully" });
  } else {
    res.send({ message: "No user found" });
  }
};

const removeUser = async (req, res) => {
  const user = await connection.find(
    { email: `${req.body.userEmail}` },
    "-password"
  );
  console.log(user);
  if (user.length > 0) {
    connection.deleteOne({ email: req.body.userEmail });
    res.send({ message: "User Removed Successfully" });
  } else {
    res.send({ message: "User Not Found" });
  }
};

const signInUser = async (req, res) => {
  const user = await connection.find({ email: `${req.body.userEmail}` });
  if (user.length > 0) {
    const match = await bcrypt.compare(req.body.userPassword, user[0].password);
    if (match) {
      const token = jwt.sign({ ...user[0] }, process.env.SECRET_KEY);

      res.send({
        success: true,
        message: "User Loggin successfully",
        token: token,
      });
    } else {
      res.send({ success: false, message: "Invalid Password" });
    }
  } else {
    res.send({ message: "No user found" });
  }
};

module.exports = {
  signUpUser,
  getUser,
  editUser,
  signInUser,
  getAllUsers,
  removeUser,
};
