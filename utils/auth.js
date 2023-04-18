const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.user_id = decoded.user_id;
        next();
    });
}

module.exports = {
    authenticateToken
};