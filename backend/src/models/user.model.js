"use strict";

const TABLE_NAME = "user";

module.exports = (sequelize, { DataTypes }) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      user_first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      user_password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_avatar: DataTypes.STRING(100),
      user_background: DataTypes.STRING(100),
      user_description: DataTypes.TEXT("tiny"),
      user_major: DataTypes.STRING(20),
      user_role: {
        type: DataTypes.ENUM("user", "admin"),
        default: "user",
      },
      user_dob: {
        type: DataTypes.DATE,
        validator: {
          isBefore: DataTypes.NOW,
        },
      },
      user_country: {
        type: DataTypes.UUID,
        references: {
          model: "Country",
          key: "id",
        },
      },
    },
    {
      tableName: TABLE_NAME,
    }
  );

  return User;
};
