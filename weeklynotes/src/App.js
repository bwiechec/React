//TODO: 1. DODAWANIE NOWYCH NOTATEK (PO PROSTU)
//TODO: 2. DODAWANIE NOWYCH NOTATEK (DO BAZY)
//TODO: 3. POBIERANIE NOTATEK (Z BAZY)

import classes from './App.module.css';
import React from "react";
import Note from './Note/Note'
import Notes from "./Utils/Notes";
import AddNote from "./AddNote/AddNote";
import NoteInfo from "./NoteInfo/NoteInfo";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            appName: 'Weekly Notes',
            author: 'Bartosz Wiecheć',
            days: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            notes: new Notes(),
            btnPopup: false,
            infoPopup: false,
            selectedNoteInfo: null
        };
    }

    componentWillMount() {
        let notesListGot = new Notes();
        fetch('/api/customers')
            .then(res => res.json())
            .then(notesList => {
                //console.log("notes list " + notesList[0].id)
                for(let i = 0; i < notesList.length; i++){
                    notesListGot.addNote(notesList[i].id,notesList[i].dateOf, notesList[i].titleOf, notesList[i].textOf)
                    console.log(notesList[i].id,notesList[i].dateOf, notesList[i].titleOf, notesList[i].textOf)
                }
                this.setState({notes: notesListGot});
                this.forceUpdate()
                }
            );

        //console.log("Notes get: " + notesListGot);
    }

    changeBtnPopup = () => {
        const newBtnPopup = !this.state.btnPopup;
        this.setState({
           btnPopup: newBtnPopup
        })
    }

    getMaxId(){
        let maxVal = 0;
        for(const x in this.state.notes){
            if(x > maxVal) maxVal = x;
        }

        return maxVal;
    }

    addNewEvent = (date, title, text) =>{
        console.log(date + title + text);
        const maxId = this.getMaxId()
        this.state.notes.addNote(maxId+1, date, title, text);
        //console.log(this.state.notes);
    }

    changeInfoPopup = (id) => {
        const newInfoPopup = !this.state.infoPopup;
        this.setState({
            infoPopup: newInfoPopup,
            selectedNoteInfo: id
        })
    }

    closeInfoPopup = () => {
        const newInfoPopup = !this.state.infoPopup;
        this.setState({
            infoPopup: newInfoPopup,
            selectedNoteInfo: null
        })
    }

    render(){
        //console.log( "dzien:" + this.state.days[(new Date().getDay() +1) %7])
        return (
            <div className={classes.App}>
                <header className={classes.AppHeader}>
                    <p>{this.state.appName}</p>
                </header>
                <div className={classes.Notes}>
                    {/*<p>NoteInfo will be here!</p>*/}
                    <Note   days={this.state.days}
                            notes={this.state.notes != null ? this.state.notes : new Notes()}
                            changeInfoPopup={this.changeInfoPopup}/>
                    <NoteInfo   trigger={this.state.infoPopup}
                                closeInfoPopup={this.closeInfoPopup}
                                selectedNoteInfo={this.state.selectedNoteInfo}
                                notes={this.state.notes.notesList}/>
                </div>
                <div className={classes.Add}>
                    <button onClick={() => this.changeBtnPopup()} className={classes.AddButton}>Add new note</button>
                    <AddNote    trigger={this.state.btnPopup}
                                changeBtnPopup={this.changeBtnPopup}
                                addNewEvent={this.addNewEvent}/>
                </div>
                <footer className={classes.AppFooter}>
                    <p>Author: {this.state.author}</p>
                </footer>
            </div>
        );
    }
}

export default App;
