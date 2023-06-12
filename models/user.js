'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

const saltRounds = 6

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { as: 'profile', foreignKey: 'userId' })
    }
    async comparePassword(tryPassword) {
      return await bcrypt.compare(tryPassword, this.dataValues.password)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already taken',
      },
      validate: {
        notNull: {
          msg: 'An email is required',
        },
        isEmail: {
          msg: 'Please provide an email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue('password')
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  })
  User.beforeSave(async (user, options) => {
    if (!user.changed('password')) return
    try {
      const hash = await bcrypt.hash(user.dataValues.password, saltRounds)
      user.password = hash
    } catch (err) {
      console.error(err)
    }
  })
  return User
}
