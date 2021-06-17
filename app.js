const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const DB = require('./db')
const movieRouter = require('./route/movieRouter')

const port = process.env.PORT || 4000;
const mongodb_uri = process.env.MONGODB_URI

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(movieRouter)



app.get('/', function (req, res) {
	res.json({message: 'Welcome to Movie Nights!!!'});
});

// morgan('tiny', ()=> 'Establishing connection to database')

console.log('Establishing connection to Database');
new DB()
	.connect(mongodb_uri)
	.then(() => console.log('Connected to Database'))
	.catch((error) => console.error(error));


app.listen(port, 'localhost', console.log(`App listening on port ${port}` ));