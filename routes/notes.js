// REQUIRES FOR NOTES - SET UP AS A ROUTE
const notes = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const shortid = require('shortid');

// NOTES GET ROUTE
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// NOTES POST ROUTE
notes.post('/', (req, res) => {
    const {title, text} = req.body;
    // ONLY CREATE NEW NOTE IF NOT EMPTY
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: shortid.generate()
        }
        // ADDS NOTE TO THE JSON FILE
        readAndAppend(newNote, './db/db.json');
        res.json(`New Note added!`)
    } else {
        res.error('Error adding new Note')
    }
})

// NOTES DELETE ROUTE
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    // GRAB WHOLE JSON FILE
    readFromFile('./db/db.json')
    // PARSE IT FROM A STRING TO JSON
    .then((data) => JSON.parse(data))
    .then((json) => {
        // CREATING NEW VARIABLE CONTAINING ALL THE JSON DATA EXCEPT THE NOTE WE CLICKED DELETE ON
        const filtered = json.filter((note) => note.note_id !== noteId)
        // WRITING BACK TO THE JSON FILE
        writeToFile('./db/db.json', filtered);
        res.json(`Note ${noteId} has been removed`)
    })
})

module.exports = notes;