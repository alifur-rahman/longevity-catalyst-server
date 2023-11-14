// import httpStatus from "http-status";
// import ApiError from "../../../../errors/ApiError";
// import { jwtHelpers } from "../../../../helpers/jwtHelpers";
// import { Project } from "../project.model";
// import { VoteModel } from "./vote.modle";

// const createOrRemoveVote = async (voteData: {
//   token: string;
//   projectId: number;
//   voteType: "up" | "down";
// }) => {
//   const { token, projectId, voteType } = voteData;

//   const userInfo = jwtHelpers.getUserInfoByToken(token);
//   if (!userInfo) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
//   }
//   const { userId } = userInfo;

//   // Check for user has already voted this item
//   const existingVote = await VoteModel.findOne({
//     where: { userId, projectId },
//   });

//   // Include the project vote count
//   const projectData = await Project.findByPk(projectId);
//   if (!projectData) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Project Not found");
//   }

//   if (existingVote) {
//     if (existingVote.voteType === voteType) {
//       // The user is changing their vote to the same type, remove the vote
//       await existingVote.destroy();

//       // Update the vote count
//       if (voteType === "up") {
//         projectData.upVoteCount--;
//       } else {
//         projectData.downVoteCount--;
//       }
//     } else {
//       // The user is changing their vote type, adjust the vote count
//       if (existingVote.voteType === "up") {
//         projectData.upVoteCount--;
//       } else {
//         projectData.downVoteCount--;
//       }

//       if (voteType === "up") {
//         projectData.upVoteCount++;
//       } else {
//         projectData.downVoteCount++;
//       }

//       existingVote.voteType = voteType;
//       await existingVote.save();
//     }
//   } else {
//     // If the user hasn't voted before, create a new vote
//     await VoteModel.create({ userId, projectId, voteType });

//     // Update the vote count
//     if (voteType === "up") {
//       projectData.upVoteCount++;
//     } else {
//       projectData.downVoteCount++;
//     }
//   }
//   return voteData;
// };

// const getVoteByProject = async (projectId: number) => {
//   try {
//     const projectData = await Project.findByPk(projectId);
//     if (!projectData) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Project Not found");
//     }
//     const upVote = projectData.upVoteCount;
//     const downVote = projectData.downVoteCount;

//     return {
//       projectId: projectData.id,
//       upVote,
//       downVote,
//       totalVoteCount: upVote - downVote,
//     };
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Get Error");
//   }
// };

// const getVotebyUser = async (token: string) => {
//   const userInfo = jwtHelpers.getUserInfoByToken(token);
//   if (!userInfo) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
//   }
//   const { userId } = userInfo;

//   const userVotes = await VoteModel.findAll({
//     where: { userId },
//   });

//   let upVoteCount = 0;
//   let downVoteCount = 0;

//   userVotes.forEach((vote) => {
//     if (vote.voteType === "up") {
//       upVoteCount++;
//     } else if (vote.voteType === "down") {
//       downVoteCount--;
//     }
//   });

//   const totalVoteCount = upVoteCount - downVoteCount;

//   return {
//     upVoteCount,
//     downVoteCount,
//     totalVoteCount,
//   };
// };

// export const voteService = {
//   createOrRemoveVote,
//   getVoteByProject,
//   getVotebyUser,
// };
