var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require( "body-parser");
import ip from "ip";
import { createProxyMiddleware } from "http-proxy-middleware";

// セッション
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// DBオプションの取得
import dbOption from "./config/DB";
const sessionDBOptions = dbOption.session[process.env.NODE_ENV || "product"];

// MySQLセッションストア
const sessionStore = new MySQLStore(sessionDBOptions);


// routers
var indexRouter = require('./routes/index');
import apiRouter from "./routes/api";
import redirectRouter from "./routes/redirect";



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
  name: "sess_id",
  secret: "secret",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 24時間
    httpOnly: true,
  }
}));

app.use("/redirect", redirectRouter);
app.use("/api", apiRouter);

app.use("/", createProxyMiddleware({
  // target: (process.env.NODE_ENV === "dev")? `http://${ip.address()}:3030`: "https://register.apori.jp/",
  target: `http://${ip.address()}:3030`,
  changeOrigin: true,
  secure: false,
  xfwd: true,
  ws: true,
  hostRewrite: true,
  cookieDomainRewrite: true,
  pathRewrite: {
    '^/api/': "/api/v1/",
  },
  headers: {
    "Connection": "keep-alive",
    "Content-Type": "text/xml;charset=UTF-8",
    "Accept": "*"
  },
}));

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
