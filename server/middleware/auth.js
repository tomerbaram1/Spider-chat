const jwt = require("jsonwebtoken");


  const auth =  (req, res, next) => {
    try {
      if (!req.headers.authorization) throw "Forbidden!!";
      const token = req.headers.authorization.split(" ")[1];
      const payload =  jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.payload = payload;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Forbidden ",
      });
    }
  };
  
//   const token = req.header("x-auth-token");
//   if (!token)
//     return res.status(401).send("Access denied. Not authenticated...");
//   try {
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;
//     const decoded =  jwt.verify(token, jwtSecretKey);

//     req.decoded = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid auth token...");
//   }
// };




module.exports = { auth };