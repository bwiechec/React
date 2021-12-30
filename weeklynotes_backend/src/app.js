const Notes = require("./Utils/Notes");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
let notes = new Notes();

app.get('/api/customers', cors(), (req, res) => {
    res.json(notes.notesList);
    console.log("Got a request!");
});

app.listen(port, function () {
    console.log('Example app listening on port 3001!');
});