const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const { DataTypes } = Sequelize;

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT, 
        unique: {
            msg: 'username is already, please change your username'
        },
        allowNull: false
    },
    nama_toko: {
        type: DataTypes.TEXT, 
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = User;
