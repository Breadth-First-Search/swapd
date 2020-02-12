function isSelfOrAdmin(req, res, next) {
  if (+req.params.id !== req.user.id) {
    return res.redirect('/')
  } else {
    return next()
  }
}
module.exports = {
  isSelfOrAdmin
}
