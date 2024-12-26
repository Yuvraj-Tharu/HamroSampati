const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwk = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log("Request Body:", req.body);

  try {
    const existingUser = await User.findOne({ email: email });
    // console.log("exists user", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!existingUser.isVerified) {
      return res
        .status(406)
        .json({ message: "user not verified", existingUser });
    }
    //USER LOGIN
    if (existingUser.isAdmin === false) {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!matchPassword) {
        return res.status(401).json({ message: "Password mismatch" });
      }

      jwk.sign(
        { userId: existingUser._id, isAdmin: existingUser.isAdmin },
        SECRET_KEY,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: "some thing went wrong in this" });
          } else {
            // console.log(existingUser, token);
            // res.status(200).json({ result: existingUser, token });
            res.status(200).json({ result: existingUser, token: token });
          }
        }
      );
      //admin login
    } else {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!matchPassword) {
        return res.status(401).json({ message: "Password mismatch" });
      }

      jwk.sign(
        { userId: existingUser._id, isAdmin: existingUser.isAdmin },
        SECRET_KEY,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: "some thing went wrong in this" });
          } else {
            // console.log(existingUser, token);
            // res.status(200).json({ result: existingUser, token });
            res.status(200).json({ result: existingUser, token: token });
          }
        }
      );
    }
  } catch (error) {
    console.warn("Error in userLogin:", error);
    res.status(500).json({ message: "Something went wrong hre" });
  }
};

module.exports = { userLogin };
