/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  var Squares = sequelize.define('Squares', {
    x: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    y: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idTerritory: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Territory',
        key: 'idTerritory',
        onDelete: 'cascade'
      }
    }
  }, {
    tableName: 'Squares'
  });

  Squares.associate = function(models){
    Squares.belongsTo(models.Squares, {
      foreignKey: 'idTerritory',
      as: 'squares',
      onDelete: 'cascade'
    });
  } 

  return Squares;
};