require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const DB = require('./db');
const movieRouter = require('./route/movieRouter');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const mongodb_uri = process.env.MONGODB_URI;

app.use(cors({optionsSuccessStatus: 200}))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.use(morgan('tiny'));
app.use(movieRouter);

app.get('/', function (_req, res) {
	res.json({ message: 'Welcome to Movie Nights!!!' });
});

console.log('Establishing connection to Database');
new DB()
	.connect(mongodb_uri)
	.then(() => console.log('Connected to Database'))
	.catch((error) => console.error(error));

app.listen(port, () => console.log(`App listening on port ${port}`));
