const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

/** Démarrage du serveur*/
app.listen(port, () => {
  console.log('Server app listening on port' + port);
})

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

var createError = require('http-errors');
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.js');
const mongodb = require('./db/mongo.js');

mongodb.initClientDbConnection();

app.use('/documentation', express.static(path.join(__dirname, '../docs/jsdoc')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur PORT_RUSSEL !");
});


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
  res.send('error');
});


module.exports = app;
