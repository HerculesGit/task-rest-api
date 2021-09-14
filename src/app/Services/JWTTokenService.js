const dotenv = require("dotenv-safe");
const jwt = require('jsonwebtoken');

dotenv.config();


class JWTTokenService {
  async sign(userId) {
    const token = await jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: '2 days', // expires in 5min
    });

    return { auth: true, token: token, user: {} };
  }

  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      // if its okay?!, save on request
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = new JWTTokenService();
