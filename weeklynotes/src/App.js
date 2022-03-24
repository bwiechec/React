//TODO: 1. DODAWANIE NOWYCH NOTATEK (PO PROSTU)
//TODO: 2. DODAWANIE NOWYCH NOTATEK (DO BAZY)
//TODO: 3. POBIERANIE NOTATEK (Z BAZY)

import classes from './App.module.css';
import React from "react";
import Note from './Note/Note'
import Notes from "./Utils/Notes";
import AddNote from "./AddNote/AddNote";
import NoteInfo from "./NoteInfo/NoteInfo";
import { trackPromise } from 'react-promise-tracker';
import { Spinner } from './spinner';

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

        this.getNotes.bind(this);
    }

    componentWillMount() {
        this.getNotes();
        //console.log("Notes get: " + notesListGot);
    }

    changeBtnPopup = () => {
        const newBtnPopup = !this.state.btnPopup;
        this.setState({
           btnPopup: newBtnPopup
        })
        this.forceUpdate();
    }

    getNotes(){
        let notesListGot = new Notes();
        trackPromise(
        fetch('/api/noteGeneralInfo')
            .then(res => res.json())
            .then(notesList => {
                    //console.log("notes list " + notesList[0].id)
                    for(let i = 0; i < notesList.length; i++){
                        let date = new Date(notesList[i].dateOf);
                        let year = date.getFullYear();
                        let month = date.getMonth()+1;
                        month = month < 10 ? '0' + month : month;
                        let day = date.getDate();
                        day = day < 10 ? '0' + day : day;
                        notesListGot.addNote(notesList[i].id, year + '-' + month + '-' + day, notesList[i].titleOf, notesList[i].textOf);
                        console.log(notesList[i].id, year + '-' + month + '-' + day, notesList[i].titleOf, notesList[i].textOf);
                    }
                    this.setState({notes: notesListGot});
                    this.forceUpdate()
                    this.render();
                }
            )
        )
    }

    addNewEvent = () =>{
        this.getNotes();
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
