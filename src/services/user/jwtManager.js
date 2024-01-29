const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
        userEmail: user.email,
    };
    const options = {
        expiresIn: "10min",
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const generateRefreshToken = (user) => {
    const payload = {
        userId: user._id,
        userEmail: user.email,
    };
    const options = {
        expiresIn: "30min",
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const generateNewAccessToken = (decoded) => {
    const payload = {
        userId: decoded.userId,
        userEmail: decoded.userEmail,
    };
    const options = {
        expiresIn: "1min",
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateNewAccessToken,
};