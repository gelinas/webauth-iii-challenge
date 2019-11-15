const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

// // get for all users
// router.get("/", restricted, checkRole(["student", "admin"]), (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

// get for only users in your department
router.get("/", restricted, (req, res) => {
  Users.findBy( { department: req.decodedJwt.department })
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkRole(roles) {
  return function(req, res, next) {
    if (roles.includes(req.decodedJwt.role)) {
      next();
    } else {
      res.status(403).json({ message: "Can't touch this!" });
    }
  };
}
