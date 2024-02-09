const { asyncHandler } = require("../utils/asyncHandler");
const {
    addNewWorkspace,
    workspaceList,
    workspaceDetail,
    updateWorkspaceData,
    deleteWorkspaceData,
} = require("../services/workspace/workspaceService");

const createWorkspace = asyncHandler(async(req, res) => {
    const workspace = await addNewWorkspace(req.body, req.user.userId);
    res.status(201).json({ status: 201, data: workspace });
});

const fetchWorkspaceList = asyncHandler(async(req, res) => {
    const { search } = req.query;
    const list = await workspaceList(req.user.userId, search);
    res.status(200).json({status: 200, data:list});
});

const fetchWorkspaceDetail = asyncHandler(async(req, res) => {
    const detail = await workspaceDetail(req.params.workspaceId, req.user.userId);
    res.status(200).json({status: 200, data: detail});
});

const updateWorkspace = asyncHandler(async(req, res) => {
    const update = await updateWorkspaceData(req.body, req.params.workspaceId, req.user.userId);
    res.status(200).json({status: 200, data: update});
})

const deleteWorkspace = asyncHandler(async(req, res) => {
    const workspace = await deleteWorkspaceData(req.params.workspaceId, req.user.userId);
    res.status(204).json({status: 200, data: workspace});
})

module.exports = {
    createWorkspace,
    fetchWorkspaceList,
    fetchWorkspaceDetail,
    deleteWorkspace,
    updateWorkspace,
};