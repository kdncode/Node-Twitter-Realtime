const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      hbs = require('hbs'),
      expressHbs = require('express-handlebars'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      flash = require('express-flash'),
      passport = require('passport'),
      cookieParser = require('cookie-parser'),
      config = require('./config/secret');

const app = express();

mongoose.connect(config.database, function(err) {
    if (err) console.log(err);
    console.log("Connected to the db")
})

app.engine('.hbs', expressHbs( { defaultLayout: 'layout', extname: '.hbs'}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended : true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    store: new MongoStore({ url: config.database, autoReconnect: true})
}));

app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
})

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);


app.listen(3030,( err ) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${3030}`)
})