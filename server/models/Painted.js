/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Painted', {
    idPainted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    x: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    y: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Painted'
  });
};
