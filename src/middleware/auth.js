const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Unauthorized. Please login.' });
};

const isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') return next();
  return res.status(403).json({ error: 'Access denied. Admins only.' });
};

module.exports = { isAuthenticated, isAdmin };
