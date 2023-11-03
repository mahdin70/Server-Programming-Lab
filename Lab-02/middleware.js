const users = [];

function isAuthenticated(req, res, next) {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  req.user = user;
  next();
}

module.exports = {isAuthenticated,users,};
