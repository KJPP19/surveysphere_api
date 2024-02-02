const express = require("express");
const { createWorkspace, fetchWorkspaceList, fetchWorkspaceDetail, deleteWorkspace, updateWorkspace } = require("../controllers/workspaceController");
const { verifyAccessToken } = require("../middleware/verifyTokens");
const router = express.Router();

router.post("/workspace", verifyAccessToken, createWorkspace);
router.get("/workspace", verifyAccessToken, fetchWorkspaceList);
router.get("/workspace/:workspaceId", verifyAccessToken, fetchWorkspaceDetail);
router.put("/workspace/:workspaceId", verifyAccessToken, updateWorkspace);
router.delete("/workspace/:workspaceId", verifyAccessToken, deleteWorkspace);

module.exports = router;