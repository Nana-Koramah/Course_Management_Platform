const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};

exports.authorizeFacilitatorSelf = (req, res, next) => {
  if (req.user.role === 'facilitator') {
    req.facilitatorId = req.user.facilitatorId;
    return next();
  }
  return res.status(403).json({ message: 'Access denied' });
};

exports.readOnlyManager = (req, res, next) => {
  if (req.user.role === 'manager') {
    return next();
  }
  return res.status(403).json({ message: 'Managers can only read logs' });
};


// Shortcut for common roles
exports.authorizeManager = exports.authorizeRoles('manager');
exports.authorizeFacilitator = exports.authorizeRoles('facilitator');
exports.authorizeStudent = exports.authorizeRoles('student');
