/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Territory', {
    idTerritory: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    startx: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    starty: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    endx: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    endy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Territory',
    timestamps:false
  });
};
