const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accesstoken;

    if(!accessToken) {
        return res.status(401).json({status:401, error:"Unauthorized"});
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({status:401, error:"Unauthorized, access token expired"});
        };
        return res.status(401).json({status:401, error:"Unauthorized"});
    };
};

module.exports = {
    verifyAccessToken,
};