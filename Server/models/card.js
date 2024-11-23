const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.User, { foreignKey: 'userId' });
      Card.hasMany(models.Activity, { foreignKey: 'cardId' });
    }
  }
  Card.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Card',
    }
  );
  return Card;
};
