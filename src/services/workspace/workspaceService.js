const Workspace = require("../../models/workspaceModel");
const { apiError } = require("../../utils/customError");

const addNewWorkspace = async(workspaceData, userId) => {
    const { name } = workspaceData;
    const newWorkspace = await Workspace.create({
        name,
        user: userId
    });
    return newWorkspace;
};

const workspaceList = async(userId, searchQuery) => {
    const query = {
        user: userId,
        name: { $regex: new RegExp(searchQuery, "i") },
      };
    const workspaces = await Workspace.find(query);
    return workspaces;
};

const workspaceDetail = async(workspaceId, userId) => {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId })
    .populate({
        path: "survey",
        select: "-user -isEnabled -questions -workspace -shareableSurveyId",
    });
    if(!workspace){
        throw new apiError("workspace not found", 404);
    };
    return workspace;
};

const updateWorkspaceData = async(workspaceData, workspaceId, userId) => {
    const { name } = workspaceData;
    const updateWorkspace = await Workspace.findByIdAndUpdate(
        {_id: workspaceId, user: userId},
        { name },
        { new: true },
    );
    if (!updateWorkspace) {
        throw new apiError("workspace not found", 404);
    };
    return updateWorkspace;
};

const deleteWorkspaceData = async (workspaceId, userId) => {
    const deleteWorkspace = await Workspace.findByIdAndDelete({
        _id: workspaceId,
        user: userId,
    });
    if (!deleteWorkspace) {
        throw new apiError("workspace does not exist", 404);
    };
    return deleteWorkspace;
};

module.exports = {
    addNewWorkspace,
    workspaceList,
    workspaceDetail,
    updateWorkspaceData,
    deleteWorkspaceData,
};