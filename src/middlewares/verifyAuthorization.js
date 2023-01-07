const User = require("../models/User");

const verifyAuthorization = async (req, res, next) => {
  const { uid } = req;
  const { id } = req.params;

  if (!uid) {
    return res.status(401).json({
      status: 401,
      message: "unauthorized access",
    });
  }

  const user = await User.findById(uid);
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "user not authenticated",
    });
  }

  if (id !== uid && !user.isAdmin) {
    return res.status(403).json({
      status: 403,
      message: "you are not alowed to do that",
    });
  }
  next();
};

module.exports = { verifyAuthorization };
