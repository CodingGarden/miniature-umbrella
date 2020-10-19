require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();
app.enable('trust proxy');

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('./public'));
app.use(routes)

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
