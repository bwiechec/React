const Note = require("./Note");
const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
console.log(date);
class Notes { //TODO FOLLOW EXPANSION OF NOTE.js CLASS
    notesList = [
        //new Note(1,, 'Notatka 1', 'notatka 1 z dnia 1'),
        new Note(2,'2021-12-28', 'Notatka 1', 'notatka 1 z dnia 22.12'),
        new Note(3,date, 'Notatka 1', 'notatka 1 z dnia 3')
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