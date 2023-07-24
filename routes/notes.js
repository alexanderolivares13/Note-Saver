const notes = require("express").Router();
const fs = require("fs");
const utils = require("util");
const { v4: uuidv4} = require('uuid');
const readFromFile = utils.promisify(fs.readFile);
function writeFile(path, data) {
    fs.writeFile(path, data, (err) =>
    err ? console.info(err) : console.info("Changes made successfully!"))
}

notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if(title, text) {
        readFromFile('./db/notes.json')
        .then((data) => {
            const parsedNote = JSON.parse(data)
            const toDo = {
                title,
                text,
                id: uuidv4(),
            };
            parsedNote.push(toDo);
            writeFile('./db/notes.json', JSON.stringify(parsedNote));
            res.status(201).json('Note added successfully! 📝');
        });
    } else { res.status(500).json('Unable to add your note.')}
});

notes.delete('/:id', (req, res) => {
    const requestedId = req.params.id;
    readFromFile('./db/notes.json')
    .then((data) => {
        const notesList = JSON.parse(data)
        return notesList.filter((note) => note.id !== requestedId);
    })
    .then((filteredData) => {
        writeFile('./db/notes.json', JSON.stringify(filteredData));
        res.json('Your notes have been updated')
    })
})

module.exports = notes;
