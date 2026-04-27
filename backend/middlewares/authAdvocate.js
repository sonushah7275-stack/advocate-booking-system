import jwt from "jsonwebtoken";

// advocate authentication middleware
const authAdvocate = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.advoId = token_decode.id; // ✅ FIXED

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdvocate;
