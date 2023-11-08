import { DataTypes, Model, Sequelize } from "sequelize";
import { LikeAttributes } from "./like.interface";

class LikeModel extends Model {
  public id!: number;
  public userId!: number;
  public likedItemId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const defineLikeModel = (sequelize: Sequelize) => {
  LikeModel.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likedItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "likes",
    }
  );
};

interface LikeInstance extends Model<LikeAttributes>, LikeAttributes {}

export { LikeInstance, LikeModel, defineLikeModel };
