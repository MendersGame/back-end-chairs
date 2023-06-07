'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Chair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chair.belongsTo(models.User, { foreignKey: 'userId' })
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
