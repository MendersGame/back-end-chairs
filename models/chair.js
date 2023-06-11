'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Chair extends Model {
    static associate(models) {
      Chair.hasMany(models.Vote, {
        as: 'voteReceived',
        foreignKey: 'profileId'
      })
    }
  }
  Chair.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: DataTypes.STRING,
    photo: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Chair',
  })
  return Chair
}