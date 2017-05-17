var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware to parse and make request json and form data available
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static resources
app.use(express.static(path.join(__dirname, 'public')));

// make separated routers available
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// port can be assigned from env or default:
var port = process.env.PORT || 1337;
app.listen(port);
console.log('App is live on port:' + port);

module.exports = app;
