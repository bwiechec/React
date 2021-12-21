const Note = require("./Note");

class Notes { //TODO FOLLOW EXPANSION OF NOTE.js CLASS
    notesList = [
        //new Note(1,, 'Notatka 1', 'notatka 1 z dnia 1'),
        new Note(2,'2021-12-22', 'Notatka 1', 'notatka 1 z dnia 2'),
        //new Note(3,Date.now(), 'Notatka 1', 'notatka 1 z dnia 3')
    ];

    constructor() {
    }

    addNote(id, date, title, text){ //TODO MAKE ID UNIQUE UNTILL NODE WILL COME
        this.notesList.push(new Note(id, date, title, text))
    }
    deleteNote(id, date, title, text){
        this.notesList.splice(this.notesList.indexOf(new Note(id, date, title, text)), 1)
    }
}

module.exports = Notes