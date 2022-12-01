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

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: shortid.generate()
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`New Note added!`)
    } else {
        res.error('Error adding new Note')
    }
})

// NOTES DELETE ROUTE
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const filtered = json.filter((note) => note.note_id !== noteId)

        writeToFile('./db/db.json', filtered);
        res.json(`Note ${noteId} has been removed`)
    })
})

module.exports = notes;