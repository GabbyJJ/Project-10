const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

//This will authenticate the user by email
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);
  console.log(credentials);

  // This will authenticate the User by email address.
  if (credentials) {
    let user = await Users.findOne({
      where: { emailAddress: credentials.name },
    });
    if (user) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        user.password
      );
      //If the authentication is true it will be successful.
      if (authenticated) {
        console.log(`Authentication successful for ${user.email}`);
        req.currentUser = user;
        //If authentication is the true alerts will not allow the user to submit.
      } else {
        message = `Authentication failure for username: ${user.email}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
