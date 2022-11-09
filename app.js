require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'), bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const apiOrderRoute = require('./component/purchasing/routes');
const apiUserRoute = require('./component/users/routes');
const apiItemRoute = require('./component/item/routes');

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
app.use('/api/order/' + process.env.apiVersion, apiOrderRoute);
app.use('/api/users/' + process.env.apiVersion, apiUserRoute);
app.use('/api/items/' + process.env.apiVersion, apiItemRoute);

app.use('/api/doc/' + process.env.apiVersion, (req, res, next) => {
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
    await sequelize.sync({ force: false, alter: true });    
}
db();

module.exports = app;
