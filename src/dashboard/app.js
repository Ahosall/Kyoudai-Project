require('dotenv').config()

const express         =                 require('express');
const chalk           =                   require('chalk');
const session         =         require('express-session');
const MongoStore      =  require('connect-mongo')(session);
const passport        =                require('passport');
const path            =                    require('path');
const mongoose        =                require('mongoose');
const logger          =                  require('morgan');
const client          =                  require('../app');
const port            =           process.env.PORT || 3000;

const app = express();

const discordStrategy = require('./strategies/discord');

/* |==============================|
 * |           ROUTES             |
 * |==============================|
 */

let auth       =       require('./routes/auth');
let dashboard  =  require('./routes/dashboard');
let index      =      require('./routes/index');

/* |==============================|
 * |           ENGINE             |
 * |==============================|
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'Kyoudai-project.OAuth2',
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

/* |==============================|
 * |      PASSPORT · CONFIG       |
 * |==============================|
 */

app.use(passport.initialize());
app.use(passport.session());

/* |==============================|
 * |     MIDDLEWARE · ROUTES      |
 * |==============================|
 */

app.use('/', index);
app.use('/auth', auth);
app.use('/dashboard', dashboard);

/* |==============================|
 * |       ERRORS HANDLERS        |
 * |==============================|
 */

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler 
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;