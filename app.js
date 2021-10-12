const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movie');
const entranceRouter = require('./routes/entrance');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.use(cors({
  origin: 'https://project.movie-explorer.nomoredomains.club',
  methods: ['POST', 'DELETE', 'GET', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(entranceRouter);

app.use('/', userRouter);
app.use('/', moviesRouter);

app.use(indexRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

app.listen(PORT);
