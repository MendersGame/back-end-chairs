'use strict'

const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.Chair, { foreignKey: 'chairId' })
      Vote.belongsTo(models.Profile, { foreignKey: 'voterId' })
    }
  }
  Vote.init({
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
				max: 5,
      },
    },
    chairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Chair',
        key: 'id',
      },
    },
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
