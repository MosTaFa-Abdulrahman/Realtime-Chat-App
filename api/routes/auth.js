const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check User
    const { username, gender } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists 🙄🧐" });
    } else {
      const salt = bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(req.body.password, parseInt(salt));

      // Images
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        ...req.body,
        password: hashPassword,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      await newUser.save();

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        res.status(200).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          password: newUser.password,
          profilePic: newUser.profilePic,
          gender: newUser.gender,
        });
      } else res.status(400).json({ error: "Invalid user data 😥" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json("User not Found 😥");
    } else {
      const validatePassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validatePassword) {
        return res.status(404).json({ error: "Wrong Password 😥" });
      } else {
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          password: user.password,
          gender: user.gender,
          profilePic: user.profilePic,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  try {
    // res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("access_token", "", {
      httyOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully 😍" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
