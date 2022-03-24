const NoteModel = require("./Utils/NoteModel");
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

async function execGeneral(date) {
    const filter = {};//{"dateOf": {$gt: date, $lt: nextDay}};
    const all = NoteModel.find(filter);
    all.select("id dateOf titleOf textOf");
    return await all.exec();
}

async function execSpecific(id) {
    const filter = {"id": id};
    //console.log(filter);
    const all = NoteModel.find(filter);
    all.select("id dateOf titleOf textOf");
    return await all.exec();
}

async function execMaxId() {
    const filter = {};
    const all = NoteModel.find(filter).sort({"id":-1}).limit(1);
    all.select("id");
    return await all.exec();
}

app.get('/api/noteSpecificInfo', cors(), (req, res) => {
    execSpecific(req.query['id']).then((resExec)=>{
        res.json(resExec);
        console.log("Got a request!");
    });
});

app.post('/api/addNote', (req, res) => {
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.get('dateOf'));
    const dateOf = req.body['dateOf'];
    const titleOf = req.body['titleOf'];
    const textOf = req.body['textOf'];
    console.log('data: ' + dateOf + ' Tytul: ' + titleOf + ' tekst ' + textOf);
    execMaxId().then((resExecMax)=>{
        let maxFoundId = resExecMax[0]["id"]+1;
        const newNote = new NoteModel({'id': maxFoundId, dateOf: dateOf, titleOf: titleOf, textOf: textOf});
        newNote.save(function(err, car){
            if(err) res.json(err);
            else res.json('Title of added: ' + car.titleOf);
            res.end();
        })
        console.log("Got a request!");
    });
});

app.get('/api/noteGeneralInfo', cors(), (req, res) => {
    execGeneral().then((resExec)=>{
        res.json(resExec);
        console.log("Got a request!");
    });
});

app.listen(port, function () {
    console.log('Example app listening on port 3001!');
});