/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";

class Project extends Model {
  [x: string]: any;
  static async findProjectById(id: number) {
    return Project.findByPk(id);
  }
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    user_email: {
      type: DataTypes.STRING,
    },

    affiliation: {
      type: DataTypes.STRING,
    },
    project_desc: {
      type: DataTypes.TEXT,
    },
    project_keywords: {
      type: DataTypes.JSON,
    },
    onsite_work: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    address_line: {
      type: DataTypes.STRING,
    },
    city_town: {
      type: DataTypes.STRING,
    },
    state_region_province: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    projecType: {
      type: DataTypes.ENUM("Individual", "Team", "Other"),
      defaultValue: "Other",
    },
    projectNature: {
      type: DataTypes.ENUM(
        "General Programming",
        "Data Analysis",
        "Wet Lab",
        "Other"
      ),
      defaultValue: "Other",
    },
    projectExperience: {
      type: DataTypes.ENUM(
        "Novice",
        "Intermediate",
        "Proficient",
        "Advanced",
        "Expert"
      ),
      defaultValue: "Novice",
    },
    required_skill_list: {
      type: DataTypes.TEXT,
    },
    p_deadline: {
      type: DataTypes.DATE,
    },
    hardDeadline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expectedTimeProject: {
      type: DataTypes.ENUM(
        "Less than 1 week",
        "Less than 1 month",
        "Less than 3 months",
        "Greater than 3 months",
        "Other"
      ),
      defaultValue: "Other",
    },
    haveProjectBudget: {
      type: DataTypes.ENUM(
        "I have a budget",
        "I will require a volunteer / sponsorship"
      ),
      defaultValue: "I have a budget",
    },
    answer: {
      type: DataTypes.TEXT,
    },
    readyToStart: {
      type: DataTypes.ENUM(
        "Immediately",
        "Within 1 week",
        "Within 2 week",
        "Other"
      ),
      defaultValue: "Other",
    },
    final_deliverable_details: {
      type: DataTypes.TEXT,
    },
    relevant_link: {
      type: DataTypes.STRING,
    },
    relevant_literature_link: {
      type: DataTypes.TEXT,
    },
    other_included: {
      type: DataTypes.TEXT,
    },
    upVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

export { Project };
