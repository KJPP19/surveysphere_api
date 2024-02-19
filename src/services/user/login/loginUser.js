const User = require("../../../models/userModel");
const { apiError } = require("../../../utils/customError");
const { decryptHashedPassword } = require("../passwordManager");
const { generateAccessToken, generateRefreshToken } = require("../jwtManager");
const userInitials = require("./extractInitials")
const logger = require("../../../logger");

const login = async (userData) => {
    const { email, password } = userData;
    logger.debug("attempting to login", {user: userData.email});
    const existingUser = await User.findOne({email});
    if (!existingUser || !(await decryptHashedPassword(password, existingUser.password)) || !password) {
        throw new apiError("the provided email or password is incorrect", 400);
    };
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    const userName = `${existingUser.firstname} ${existingUser.lastname}`;
    const user = {
        id: existingUser._id,
        email: existingUser.email,
        name: userName,
        initials: userInitials(userName),
    };
    logger.info("successfully logged in", {user: userData.email});
    return { accessToken, refreshToken, user };
};

module.exports = { login };