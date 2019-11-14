const jwt = require("jsonwebtoken"); //1:  npm i jsonwebtoken

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    // check that the token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // bad panda, token has been tampered with
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};

// users

// roles

// can a user have more than one role

// can a role be assigned to more than one user
