module.exports = function(req, res, next) {
  // console.log('--------------', req.session);
  // req.locals.isAuth = req.session.isAuth;

  next();
};
