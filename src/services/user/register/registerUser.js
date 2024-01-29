const User = require("../../../models/userModel");
const { hashPassword } = require("../passwordManager");
const { apiError } = require("../../../utils/customError");
const logger = require("../../../logger");


const register = async (userData) => {
    const {email, firstname, lastname, password, confirmpassword} = userData;
    logger.debug("attempting to register new user", {user: userData.email});
    const existingUserEmail = await User.findOne({email});
    if(existingUserEmail) {
        throw new apiError("email already exist", 400);
    };
    if (password === confirmpassword) {
        const hashedPassword = await hashPassword(password)
        await User.create({ email, firstname, lastname, password:hashedPassword });
        logger.info("User registered successfully", {user: userData.email});
    } else {
        throw new apiError("password and confirm password does not match", 400);
    };
};

module.exports = { register };