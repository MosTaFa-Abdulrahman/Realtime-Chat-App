const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// Verify Token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized 😌" });

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyToken };
