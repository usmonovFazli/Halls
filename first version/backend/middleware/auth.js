const jwt =require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.sendStatus(401); // Нет токена

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Токен неверный

    req.user = user; // Вставляем инфу о пользователе в req
    next();
  });
}


function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403); // Доступ запрещён
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};