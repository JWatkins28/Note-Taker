// REQUIRE FOR APP
const express = require('express');

// IMPORTING ROUTES
const notesRouter = require('./notes');

// SETTING UP EXPRESS
const app = express();

// INDEX WILL ROUTE TO THE NOTES FILE
app.use('/notes', notesRouter);

module.exports = app;