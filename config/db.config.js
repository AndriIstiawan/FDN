const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,

    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },

    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
    
});

db.authenticate().then(() => {
    console.log('Success!');
}).catch((err) => {
    console.log(err);
});

module.exports = db;  
