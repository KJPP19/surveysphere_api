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
    const workspaces = await Workspace.find(query)
    .populate({
        path: "survey",
        select: "-user -questions -workspace -shareableSurveyId",
    });
    return workspaces;
};

const workspaceDetail = async(workspaceId, userId, sortOption) => {
    const sortCriteriaValues = {
        az: {'title': 1},
        za: {'title': -1},
        newest: {'createdAt': -1},
        oldest: {'createdAt': 1},
    };

    const sortCriteria = sortCriteriaValues[sortOption] || {};
    console.log(sortCriteria);

    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId })
    .populate({
        path: "survey",
        select: "-user -questions -workspace -shareableSurveyId",
        options: {sort: sortCriteria}
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
    ).populate({
        path: "survey",
        select: "-user -questions -workspace -shareableSurveyId",
    });
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