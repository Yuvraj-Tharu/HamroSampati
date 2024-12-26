const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const User = require("../Models/UserSchema");
const jwk = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "NOTESAPI";
require("dotenv").config();
const autherEmail = process.env.EMAIL;
const autherPassword = process.env.PASSWORD;

const secret = speakeasy.generateSecret({ length: 20 });

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(404).json({ message: "user already exists" });
    } else {
      if (password !== confirmPassword) {
        return res.status(403).json({ message: "password not match" });
      } else {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: autherEmail,
            pass: autherPassword,
          },
        });

        const otp = speakeasy.totp({
          secret: secret.base32,
          encoding: "base32",
        });

        const mailOptions = {
          from: "yuvrajtharu123@gmail.com",
          to: email,
          subject: "Your OTP",
          // text: `Your verification OTP is: ${otp}`,
          html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50; text-align: center;">Welcome to Our Service!</h2>
            <p style="font-size: 16px;">Dear ${firstName} ${lastName},</p>
            <p style="font-size: 14px;">Your verification OTP is:</p>
            <h3 style="color: #FF5733; background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">
              ${otp}
            </h3>
            <p style="font-size: 14px;">Use this OTP to complete your registration. This OTP is valid for the next 10 minutes.</p>
            <p style="font-size: 14px;">If you didn't request this email, please ignore it.</p>
            <br />
            <p style="font-size: 14px;">Best regards,</p>
            <p style="font-size: 14px;">Your Company Name</p>
            <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #777;">
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
              <p><a href="#" style="color: #4CAF50; text-decoration: none;">Unsubscribe</a></p>
            </footer>
          </div>
        `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Failed to send OTP" });
          } else {
            // console.log("Email sent: " + info.response);
            res.status(200).json({ message: "OTP sent successfully" });
          }
        });

        const result = await User.create({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        });
        // console.log(" result:", result);

        jwk.sign({ result }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res
              .status(410)
              .json({ message: "some thing went wrong with the token" });
          } else {
            res.status(200).json({ result: result, token });
            console.log(result, token);
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong " });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const existingOTP = await User.findOne({ otp: otp });

    if (existingOTP) {
      if (existingOTP.otp === otp) {
        const UpdateUser = await User.findByIdAndUpdate(
          existingOTP._id,
          {
            $set: { isVerified: true },
            $unset: { otp: "1" },
          },
          { new: true }
        );

        res.status(200).json({
          message: "User signed up, OTP matched!",
          existingOTP: existingOTP.otp,
        });
      } else {
        res.status(401).json({ message: "Invalid OTP" });
      }
      // res.send(existingOTP);
    } else {
      res.status(404).json({ message: "User not found with provided OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const google = async (req, res) => {
  try {
    const { firstName, lastName, email, avatar } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", result: existingUser });
    }

    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatePassword, 10);
    const hashedConfirmPassword = hashedPassword;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      avatar,
      isVerified: true,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", result: savedUser });
  } catch (error) {
    console.error("Error storing Google user data:", error);
    res.status(500).json({ error: "Failed to store user data" });
  }
};

module.exports = { signupUser, sendOTP, google };
