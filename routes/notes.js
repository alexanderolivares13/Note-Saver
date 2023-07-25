const notes = require("express").Router();
const { v4: uuidv4} = require('uuid');
const fs = require("fs");
const utils = require("util");
// using promisify from the util package to allow an async function to be used after the readfile method is used from the fs module.
const readFromFile = utils.promisify(fs.readFile);
function writeFile(path, data) {
    fs.writeFile(path, data, (err) =>
    err ? console.info(err) : console.info("Changes made successfully!"))
}

// setting the endpoint and response for the get fetch method to send note objects to the user which will be used to display the notes list on the front end.
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// setting the post endpoint, which will first check the request body sent by the user has a title and text property.
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if(title, text) {
        // if the title and text properties are found, the data is parsed and used to construct a new object that adds a unique id property to the object using the uuid package.
        readFromFile('./db/notes.json')
        .then((data) => {
            const parsedNote = JSON.parse(data)
            const toDo = {
                title,
                text,
                id: uuidv4(),
            };
            // after the id is added the new object is pushed back into the json data, and is used to resave into the notes.json with the newly added note to the file.
            parsedNote.push(toDo);
            writeFile('./db/notes.json', JSON.stringify(parsedNote));
            // then the user is sent a response with a code 201 for 'created' to notify them that their note is successfully received and added to the notes list.
            res.status(201).json('Note added successfully! 📝');
        });
    } 
    // if the conditions do not pass, then the server responds with code 500 to notify them of a server error.
    else { res.status(500).json('Unable to add your note.')}
});

// sets the parameter endpoint that takes in an id
notes.delete('/:id', (req, res) => {
    // the id is taken from the request body and the unique id is submitted when the user clicks the delete button on the application.
    const requestedId = req.params.id;
    // the json file is read then the unique id is used to filter the object array to return every element of the array EXCEPT the one that matched the unique id.
    readFromFile('./db/notes.json')
    .then((data) => {
        const notesList = JSON.parse(data)
        return notesList.filter((note) => note.id !== requestedId);
    })
    .then((filteredData) => {
        // then the newly filtered data is saved back into the notes.json file and the user is sent a response after the note in the list was deleted.
        writeFile('./db/notes.json', JSON.stringify(filteredData));
        res.json('Your notes have been updated')
    })
})

module.exports = notes;
