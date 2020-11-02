  
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows')
const genresRouter = require('./routes/genres')
const commentsRouter = require('./routes/comments')
const profileRouter = require('./routes/Profile')
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shows', showsRouter);
app.use('/genre', genresRouter)
app.use('/comments',commentsRouter)
app.use('/profile', profileRouter)


app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found. Try again.');
});
module.exports = app;