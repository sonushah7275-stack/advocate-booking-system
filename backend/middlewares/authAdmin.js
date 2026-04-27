import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    next(); // ✅ ONLY ONCE
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authAdmin;
