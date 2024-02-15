const express = require("express");
const { createQuestion, fetchQuestionDetail, updateQuestion, removeQuestion } = require("../controllers/questionController");
const { verifyAccessToken } = require("../middleware/verifyTokens");

const router = express.Router();

router.post("/questions", verifyAccessToken, createQuestion);
router.get("/questions/:questionId", verifyAccessToken, fetchQuestionDetail);
router.put("/questions/:questionId", verifyAccessToken, updateQuestion);
router.delete("/questions/:questionId", verifyAccessToken, removeQuestion);

module.exports = router;