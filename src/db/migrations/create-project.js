/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('projects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postAuthInfo: {
      type: Sequelize.TEXT,
    },
    projectTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectDescription: {
      type: Sequelize.TEXT,
    },
    scheduleMeetingLink: {
      type: Sequelize.STRING,
    },
    experienceRequired: {
      type: Sequelize.STRING,
    },
    requiredSkills: {
      type: Sequelize.TEXT,
    },
    linksToRelevantData: {
      type: Sequelize.TEXT,
    },
    linksToRelevantLiterature: {
      type: Sequelize.TEXT,
    },
    additionalInformation: {
      type: Sequelize.TEXT,
    },
    affiliation: {
      type: Sequelize.STRING,
    },
    keywords: {
      type: Sequelize.TEXT,
    },
    onsiteRequirement: {
      type: Sequelize.STRING,
    },
    projectType: {
      type: Sequelize.STRING,
    },
    membersNeeded: {
      type: Sequelize.STRING,
    },
    primaryCategory: {
      type: Sequelize.STRING,
    },
    deadline: {
      type: Sequelize.STRING,
    },
    expectedDuration: {
      type: Sequelize.STRING,
    },
    timeToStart: {
      type: Sequelize.STRING,
    },
    projectSubmitted: {
      type: Sequelize.STRING,
    },
    upVoteCount: {
      type: Sequelize.INTEGER,
    },
    downVoteCount: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('projects');
}
