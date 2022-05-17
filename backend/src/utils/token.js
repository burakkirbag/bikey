const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env

module.exports = {
    encode(data, expiresIn) {
        return jwt.sign(data, JWT_SECRET_KEY, { expiresIn: expiresIn })
    },
    decode(token) {
        return jwt.verify(token, JWT_SECRET_KEY)
    }
};