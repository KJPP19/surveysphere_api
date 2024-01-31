const express = require("express");
const { createSurvey } = require("../controllers/surveyController");
const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();

router.post("/survey", verifyAccessToken, createSurvey);

module.exports = router;
