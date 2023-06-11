'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.Chair, { foreignKey: 'chairId' })
      Vote.belongsTo(models.Profile, { foreignKey: 'voterId' })
    }
  }
  Vote.init({
    // value: DataTypes.INTEGER,
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
				max: 5,
      },
    },
    // chairId: DataTypes.INTEGER,
    chairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Chair',
        key: 'id',
      },
    },
    // voterId: DataTypes.INTEGER,
    voterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};
