const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
   createUser(newUser, callback) {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);

      return User.create({
         first_name: newUser.first_name,
         last_name: newUser.last_name,
         email: newUser.email,
         password: hashedPassword,
         role: newUser.role
      })
      .then((user) => {
         callback(null, user);
      })
      .catch((err) => {
         console.log(err, "here is query")
         callback(err);
      })
   }
}