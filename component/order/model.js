const Sequelize = require("sequelize");
const db = require("../../config/db.config");
const { DataTypes } = Sequelize;

const Order = db.define('order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING, validate: { notEmpty: { msg: "firstname is required" } }
    },
    lastname: {
        type: DataTypes.STRING, validate: { notEmpty: { msg: "lastname is required" } }
    },
    email: {
        type: DataTypes.STRING, validate: { isEmail: { msg: "check your email is not valid" } }
    },
    item: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.STRING
    },
    total_price: {
        type: DataTypes.STRING
    }
})

module.exports = Order;
