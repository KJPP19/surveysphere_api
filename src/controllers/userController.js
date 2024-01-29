const { asyncHandler } = require("../utils/asyncHandler");
const { register } = require("../services/user/register/registerUser");
const { login } = require("../services/user/login/loginUser");
const { generateNewAccessToken } = require("../services/user/jwtManager");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async(req, res) => {
    await register(req.body);
    res.status(201).json({status:201, message:"successfully registered an account"});
});

const loginUser = asyncHandler(async(req, res) => {
    const { accessToken, refreshToken, user } = await login(req.body);
    res.cookie('accesstoken', accessToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.cookie('refreshtoken', refreshToken, {httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).json({status:200, message:"login success", user:user});
});

const newAccessToken = asyncHandler(async(req, res) => {
    const refreshToken = req.cookies.refreshtoken;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        const newAccessToken = generateNewAccessToken(decoded);
        res.cookie('accesstoken', newAccessToken, {httpOnly: true, sameSite: 'none', secure: true});
        res.status(200).json({status:200, message:"reauthenticated ok"});
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            res.status(401).json({status:401, error:"your session has expired, please login again"});
        } else {
            res.status(401).json({status:401, error:"unauthorized"});
        }
    };
});

module.exports = {
    registerUser,
    loginUser,
    newAccessToken,
};