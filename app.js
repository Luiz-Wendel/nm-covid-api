const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const cors = require('cors');

// Routers
const homeRouter = require('./routes/homeRouter');

const port = process.env.SERVER_PORT || 3000;

const app = express();

// Allow outside requests
app.use(cors());

// Print simplified requests on terminal
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRouter);

app.listen(port, () => {
  debug(`Server running on port ${chalk.red(port)}...`);
});
