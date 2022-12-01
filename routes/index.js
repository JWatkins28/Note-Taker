const express = require('express');

// IMPORTING ROUTES
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;