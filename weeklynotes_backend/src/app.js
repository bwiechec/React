const Notes = require("./Utils/Notes");
const express = require('express');
const cors = require('cors');

const app = express();

app.get('/api/customers', cors(), (req, res) => {
    let notes = new Notes();
    res.json(notes.notesList);
    console.log("Got a request!");
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});