const crypto = require("crypto");

const shareId = () => {
    const id = crypto.randomBytes(5).toString('hex');
    return id;
};

module.exports = shareId;