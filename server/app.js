var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var session = require("express-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:"chh",
  cookie:{
      maxAge:60*1000*30,
      secure:false
  },
  resave:false,//及时session没有被修改，也保存session的值
  saveUninitialized:false //无论有没有session cookie ，每次请求都设置个session cookie
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("ACCESS-Control-Allow-Headers", "Content-Type");
  //  允许客户端发送跨域请求时携带cookie信息 这个很重要
  res.header('Access-Control-Allow-Credentials', 'true');
  next()
})


app.use(express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//   origin: 'http://localhost:8080',
//   credentials: true
// }

// // 解决跨域问题
// app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'dist')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); // 用户包
const adminRouter = require('./routes/admin'); // 管理员包
const accessRouter = require('./routes/access'); // 测评
const recordRouter = require('./routes/record'); // 记录

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/access',accessRouter);
app.use('/record',recordRouter);

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
