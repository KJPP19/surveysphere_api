const express = require("express");
const { createSurvey, fetchSurveyDetail, updateSurveyData } = require("../controllers/surveyController");
const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();

router.post("/surveys", verifyAccessToken, createSurvey);
router.get("/surveys/:surveyId", verifyAccessToken, fetchSurveyDetail);
router.put("/surveys/:surveyId", verifyAccessToken, updateSurveyData);

module.exports = router;
