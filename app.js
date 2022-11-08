require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'), bodyParser = require('body-parser');

const apiOrderRoute = require('./component/order/routes');

const app = express();

app.use(cors());

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Main App Route
app.get('/', function (req, res) {
    res.json({ message: 'This is the api server main route', status: 'OK' });
});
// API Routes
app.use('/api/v1/', apiOrderRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message });
});

const sequelize = require('./config/db.config');
async function db() {
    // if (process.env.NODE_ENV === 'test') {
    //   const sequelizeTest = require('./config/db-test.config');
    // } else {
    await sequelize.sync();
    const seed = require('./config/seed');
    seed();
    // }
}
db();

module.exports = app;
