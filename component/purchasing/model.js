const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const { DataTypes } = Sequelize;
const User = require('../users/model');
const Item = require('../item/model');

const Purchasing = db.define('purchasing', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID, allowNull: false
    },
    itemId: {
        type: DataTypes.UUID, allowNull: false
    }
});

Purchasing.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Purchasing.belongsTo(Item, { foreignKey: 'itemId', onDelete: 'CASCADE' });

module.exports = Purchasing;
