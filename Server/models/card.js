const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.hasMany(models.Activity, { foreignKey: 'cardId' , as: 'activities'});
    }
  }
  Card.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Card',
    }
  );
  return Card;
};
