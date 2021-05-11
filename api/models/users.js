"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const models = require("./index");

module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First Name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last Name is required",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email Address is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) =>
          (user.password = await bcrypt.hash(user.password, 10)),
      },
      sequelize,
      modelName: "Users",
    }
  ),
    (Users.associate = (models) => {
      Users.hasMany(models.Courses, { foreignKey: "userId" });
    });
  return Users;
};
