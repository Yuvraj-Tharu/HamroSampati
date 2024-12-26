const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, password, confirmPassword, avatar } = req.body;
    const userId = req.params.id;
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateFields = {};

    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (password !== undefined) {
      const hashPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashPassword;
    }
    if (confirmPassword !== undefined) {
      const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);
      updateFields.confirmPassword = hashConfirmPassword;
    }
    if (avatar !== undefined) updateFields.avatar = avatar;

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(503)
        .json({ message: "You can only update with your own account" });
    }

    res.status(208).json({
      message: "Update user successfully",
      result: updatedUser,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const deleteUser = async (req, res) => {
//   try {
//     const userID = req.params.id;

//     const existingUser = await User.deleteOne({ _id: userID });
//     if (existingUser) {
//       // console.log(existingUser);
//       return res.status(204).json({ result: "User successfully deleted" });
//     }
//   } catch (error) {
//     console.log("internal server error:", error);
//     res.status(500).json({ message: "internal server error:", error });
//   }
// };

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const existingUser = await User.findById(userID);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = { ...existingUser._doc };

    await User.deleteOne({ _id: userID });

    // console.log("data deleted:", deletedUser);
    return res
      .status(200)
      .json({ result: "User successfully deleted", deletedUser });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error:", error });
  }
};

module.exports = { updateProfile, deleteUser };
