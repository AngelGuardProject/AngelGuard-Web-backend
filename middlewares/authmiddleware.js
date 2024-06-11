const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'um1y6ywqx8jy370';


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            req.token = token;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports = authenticateJWT;

