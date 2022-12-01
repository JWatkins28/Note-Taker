const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', api);

app.use(express.static('public'));

// HOMEPAGE GET
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// NOTES GET
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// WILDCARD GET (ADD 404 PAGE!!!!)
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/404.html'))
)

// CONFIRM PORT LISTENING
app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
)