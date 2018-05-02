const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      hbs = require('hbs'),
      expressHbs = require('express-handlebars'),
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

const mainRoutes = require('./routes/main');

app.use(mainRoutes);


app.listen(3030,( err ) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${3030}`)
})