const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
      // maxlength: 10,
      maxlength: 72,
    },
    confirmPassword: {
      type: String,
      required: [false, "Confirm password is required"],
      minlength: 4,
      // maxlength: 10,
      maxlength: 72,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    otp: {
      type: String,
      required: false,
    },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") && !this.isModified("confirmPassword")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    this.password = hashedPassword;
    this.confirmPassword = hashedConfirmPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
