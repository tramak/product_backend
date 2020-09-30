const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy({
      usernameField: 'phone',
      passwordField: 'password'
    },
    async function(username, password, done) {
      const phone = username.toString();
      const user = await User.findOne({
        where: {
          phone
        }
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const areSame = await bcrypt.compare(password, user.password);
      if (!areSame) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      // return done(null, {
      //   firstName: 'Viktor',
      //   lastName: 'Kalaev'
      // });
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) { return done(err); }
      //   if (!user) {
      //     return done(null, false, { message: 'Incorrect username.' });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect password.' });
      //   }
      //   return done(null, user);
      // });
    }
  ));
};
