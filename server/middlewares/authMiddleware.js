var jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  try {
  
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
  
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const protectRoute = async (req, res, next) => { // verify for login users
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized - No Token Provided" });
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     if (!verified) {
//       return res.status(401).json({ error: "Unauthorized - Invalid Token" });
//     }

//     const user = await User.findById(verified._id).select("-password");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log("Error in protectRoute middleware: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports =  {verifyToken} ;
