const User = require("../Models/UserSchema");

const showUser = async (req, res) => {
  try {
    const user = await User.find({ isAdmin: false });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "sth went wrong" });
  }
};

module.exports = { showUser };
