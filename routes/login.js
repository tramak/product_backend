const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(200).json({
        error: err
      });
    }

    if (!user) {
      return res.status(200).json({
        error: info.message
      });
    }

    req.session.isAuth = true;
    req.session.user = user;

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });
    // req.logIn(user, (err) => {
    //   console.log('success')
    //   if (err) {
    //     console.log({ err });
    //     return next(err);
    //   }
    //
    //   return res.status(200).json({
    //     success: true
    //   })
    // })
    // if (!user) { return res.redirect('/login'); }
    // req.logIn(user, function(err) {
    //   if (err) { return next(err); }
    //   return res.redirect('/users/' + user.username);
    // });
  })(req, res, next);
});

module.exports = router;