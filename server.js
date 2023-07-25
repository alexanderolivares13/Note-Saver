const express = require('express');
const path = require('path')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//  app.use is setting up the api endpoint that is routed from the index and the notes.js files in the routes folder
app.use('/api', api);

// this sets up the endpoint for the notes section and sends a static page of the notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// with the catchall the user will be sent to the index page if the server endpoint does not exist
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.info(`App listening at http://localhost:${PORT}`)
);