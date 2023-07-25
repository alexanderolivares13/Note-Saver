const express = require('express');
const notesRouter = require('./notes');
const app = express();
// setting a router to export to the server.js file, setting it in the index file instead of the notes folder allows for future routing if needed in the application.
app.use('/notes', notesRouter);

module.exports = app;