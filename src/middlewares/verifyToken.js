const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: "token is not valid",
    });
  }
};

module.exports = { verifyToken };
