var createError = require('http-errors');
var express = require('express');
var cookieSession = require('cookie-session')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var country = require('./routes/Admin/country');
var city = require('./routes/Admin/city');
var admin = require('./routes/Admin/dashboard');
var project = require('./routes/Admin/project');
var property = require('./routes/Admin/property');
var api = require('./routes/api');
const { count } = require('console');
var cors = require('cors')





var app = express();


var corsOptions = {
  origin: 'https://earthinvestorsgroup.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
  name: 'session',
  keys: ['earth-investor'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/country',country)
app.use('/city',city)
app.use('/admin',admin)
app.use('/project',project)
app.use('/property',property)
app.use('/api',api);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
