/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Territory = sequelize.define('Territory', {
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
    timestamps:false,
    getterMethods: {
      getArea: function(){
        var modx = this.getDataValue("endx") - this.getDataValue("startx");
        var mody = this.getDataValue("endy") - this.getDataValue("starty");
        return modx * mody;
      }
    }
  });

  Territory.associate = function(models){
    console.log("associate");
    Territory.hasMany(models.Squares, {
      foreignKey: 'idTerritory',
      as: 'squares',
      onDelete: 'cascade'
    });
  }

  return Territory;
};
