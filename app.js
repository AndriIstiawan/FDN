require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors"), bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const apiBookRoute = require('./component/order/routes');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/', indexRouter);
app.use('/api/v1/', apiBookRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log(process.env.DB_HOST)

const sequelize = require('./config/db.config');
async function db() {
  // if (process.env.NODE_ENV === 'test') {
  //   const sequelizeTest = require('./config/db-test.config');
  // } else {
  await sequelize.sync()
  const seed = require('./config/seed');
  seed()
  // }
}
db()

module.exports = app;
