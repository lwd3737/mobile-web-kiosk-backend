global.__base = __dirname;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { 
  kioskAppRouter, 
  partnerAppRouter
} = require('./routes/index');

const app = express();
const port = 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/kiosk', kioskAppRouter);
app.use('/partner', partnerAppRouter);
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});


app.listen(port,  () => {
  console.log(`listening port ${port}`);
});

module.exports = app;
