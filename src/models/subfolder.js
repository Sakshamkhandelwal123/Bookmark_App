"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubFolder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  SubFolder.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubFolder",
    }
  );

  SubFolder.associate = (models) => {
    // 1 to many with board
    SubFolder.hasMany(models.Bookmark, {
      foreignKey: "subfolder",
    });
  };

  return SubFolder;
};
