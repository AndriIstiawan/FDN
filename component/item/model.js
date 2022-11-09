const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const { DataTypes } = Sequelize;
const User = require('../users/model');

const Item = db.define('item', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = Item;
