const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const { DataTypes } = Sequelize;

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
    ItemId: {
        type: DataTypes.UUID, allowNull: false
    }
});

module.exports = Purchasing;
