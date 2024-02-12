const router = require("express").Router();
const User = require("../models/User");
const { verifyToken } = require("../utils/protectedRoute");

// getUsersForSidebar
router.get("/get", verifyToken, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
