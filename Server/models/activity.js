const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.Card, { foreignKey: 'cardId' });
    }
  }
  Activity.init(
    {
      text: { type: DataTypes.STRING, allowNull: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
      cardId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Activity',
    }
  );
  return Activity;
};
