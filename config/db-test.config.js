const Sequelize = require('sequelize-mock');

const db = new Sequelize();

const Order = db.define('order', [{
    id: 1,
    firstname: 'Tommy',
    lastname: 'Bejo',
    email: 'tommy@mail.com',
    Item: 'Barang1',
    quantity: 2,
    total_price: 100000,
}]);

module.exports = Order;  
