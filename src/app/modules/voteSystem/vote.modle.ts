import { DataTypes, Model, Sequelize } from "sequelize";
import VoteAttributes from "./vote.interface";

class VoteModel extends Model {
  public id!: number;
  public userId!: number;
  public projectId!: number;
  public voteType!: "up" | "down";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const defineVoteModel = (sequelize: Sequelize) => {
  VoteModel.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      voteType: {
        type: DataTypes.ENUM("up", "down"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "votes",
    }
  );
};

interface VoteInstance extends Model<VoteAttributes>, VoteAttributes {}

export { VoteInstance, VoteModel, defineVoteModel };
