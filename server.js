const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conectDB = require('./api/config/db');
const mongoose = require('mongoose');

conectDB();
mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 3030;

/** Mildelwares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(morgan('dev'));
app.use(morgan('common'));

/** Routes */
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
