/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Territory_has_Painted', {
    idTerritory: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Territory',
        key: 'idTerritory'
      }
    },
    idPainted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Painted',
        key: 'idPainted'
      }
    }
  }, {
    tableName: 'Territory_has_Painted'
  });
};
