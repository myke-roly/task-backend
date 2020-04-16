const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conectDB = require('./config/db');
const mongoose = require('mongoose');

conectDB();

const PORT = process.env.PORT || 3030;

/** Mildelwares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(morgan('dev'));
app.use(morgan('dev')); //common

/** Routes */
app.use('/', require('./routes/routes'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use('/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
