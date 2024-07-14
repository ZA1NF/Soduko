const jwt = require('jsonwebtoken');

const HttpError = require('../modules/config/models/http-error');

module.exports = (req, res, next) => {

  try {
    
    const token = req && req.headers && req.headers.authorization ? req.headers.authorization.split(' ')[1]:''; // Authorization: 'Bearer TOKEN'
    

    if (!token || token.length == 0) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);

    
    const clientIP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
    decodedToken.userIP = clientIP;
;
    req.body.loginUser = decodedToken;
    next();
  } catch (err) {
    //console.log(err);
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
