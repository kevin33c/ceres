'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  games.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    contract_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'contracts',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'created',
      allowNull: false,
      validate: { isIn: [['created', 'active', 'completed', 'terminated']] }
    },
    contract_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [['weather', 'flight']] }
    },
    resolver_api: {
      type: DataTypes.STRING, //JSONB
      allowNull: false,
      validate: { isUrl: true }
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING,
      validate: { isIn: [['maker_wins', 'taker_wins', 'inconclusive']] }
    },
  },
    {
      sequelize,
      modelName: 'games',
    },
    {
      indexes: [
        {
          name: 'status_index',
          fields: ['status']
        }
      ]
    });
  return games;
};