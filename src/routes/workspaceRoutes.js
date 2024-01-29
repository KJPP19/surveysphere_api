const express = require("express");
const { createWorkspace, fetchWorkspaceList, fetchWorkspaceDetail } = require("../controllers/workspaceController");
const { verifyAccessToken } = require("../middleware/verifyTokens");
const router = express.Router();

router.post("/workspace", verifyAccessToken, createWorkspace);
router.get("/workspace", verifyAccessToken, fetchWorkspaceList);
router.get("/workspace/:workspaceId", verifyAccessToken, fetchWorkspaceDetail);

module.exports = router;