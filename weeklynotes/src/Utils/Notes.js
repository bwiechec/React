import Note from "./Note";

class Notes { //TODO FOLLOW EXPANSION OF NOTE.js CLASS
    notesList = [
        new Note('pn', 'Notatka 1', 'notatka 1 z dnia 1'),
        new Note('wt', 'Notatka 1', 'notatka 1 z dnia 2'),
        new Note('sr', 'Notatka 1', 'notatka 1 z dnia 3')
    ];

    constructor() {
        this.addNote('pn', 'Notatka 2', 'notatka 2 z dnia 1');
    }

    addNote(date, title, text){
        this.notesList.push(new Note(date, title, text))
    }
    deleteNote(date, title, text){
        this.notesList.splice(this.notesList.indexOf(new Note(date, title, text)), 1)
    }
}

export default Notes;