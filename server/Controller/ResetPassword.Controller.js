const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //
    const secret = speakeasy.generateSecret({ length: 20 });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "yuvrajtharu123@gmail.com",
        pass: "wqot zipt zmje jhum",
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
      text: `Your Reset password OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send OTP" });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "OTP sent successfully", originalOtp: otp });
      }
    });

    //

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { otp: otp } },
      { new: true } // { new: true } ensures that the updated document is returned
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, NewPassword, NewConfirmPassword } = req.body;

    const existingUser = await User.findOne({ otp: otp });
    if (!existingUser) {
      return res.status(410).json({ message: "User doesn't exist" });
    }

    if (existingUser.otp !== otp) {
      return res.status(412).json({ message: "Invalid OTP" });
    }

    if (NewPassword === NewConfirmPassword) {
      const hashPassword = await bcrypt.hash(NewPassword, 10);
      const hashConfirmPassword = await bcrypt.hash(NewConfirmPassword, 10);

      const updatedUser = await User.findByIdAndUpdate(existingUser._id, {
        $set: { password: hashPassword, confirmPassword: hashConfirmPassword },
        $unset: { otp: "" },
      });

      if (!updatedUser) {
        return res.status(503).json({ message: "Internal Server Error!" });
      }

      res.status(208).json({
        message: "Password changed successfully",
        otp: otp,
      });
    } else {
      return res.status(413).json({ message: "Password does not match" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { ForgotPassword, resetPassword };
