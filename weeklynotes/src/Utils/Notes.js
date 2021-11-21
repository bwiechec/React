import Note from "./Note";

class Notes { //TODO FOLLOW EXPANSION OF NOTE.js CLASS
    notesList = [
        new Note(1,'pn', 'Notatka 1', 'notatka 1 z dnia 1'),
        new Note(2,'wt', 'Notatka 1', 'notatka 1 z dnia 2'),
        new Note(3,'sr', 'Notatka 1', 'notatka 1 z dnia 3')
    ];

    constructor() {
        this.addNote(4,'pn', 'Notatka 2', 'notatka 2 z dnia 1');
    }

    addNote(id, date, title, text){ //TODO MAKE ID UNIQUE UNTILL NODE WILL COME
        this.notesList.push(new Note(id, date, title, text))
    }
    deleteNote(id, date, title, text){
        this.notesList.splice(this.notesList.indexOf(new Note(id, date, title, text)), 1)
    }
}

export default Notes;