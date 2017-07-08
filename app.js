/*app.js*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Routes requires
var index = require('./routes/index');
var territories = require('./routes/territories');
var squares = require('./routes/squares');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/territories', territories);
app.use('/squares', squares);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;