const { apiError } = require("../utils/customError");
const logger = require("../logger");

const errorHandler = (err, req, res, next) => {
    if (err instanceof apiError) {
        logger.error(`${err.message}`);
        return res.status(err.status).json({
            status: err.status,
            error: err.message,
        });
    } else {
        logger.error(`unhandled error ${err.stack}`);
        return res.status(500).json({
            status: 500,
            error: "internal server error",
        });
    }
};

module.exports = { errorHandler };