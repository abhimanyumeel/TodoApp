const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    // Check if the authorization header exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No or invalid token provided." });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. Token missing." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // Handle specific token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    }

    // Handle other unexpected errors
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error during authentication." });
  }
};

module.exports = authenticate;
