const express = require('express');
const { registerUser, loginUser, newAccessToken} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", newAccessToken);

module.exports = router;