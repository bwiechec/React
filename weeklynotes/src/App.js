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
            days: ['pn', 'wt', 'sr', 'czw', 'pt', 'sb', 'nd'],
            notes: new Notes(),
            btnPopup: false,
            infoPopup: false,
            selectedNoteInfo: null
        };
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
        const maxId = this.getMaxId()
        this.state.notes.addNote(maxId+1, date, title, text);
        console.log(this.state.notes);
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
        return (
            <div className={classes.App}>
                <header className={classes.AppHeader}>
                    <p>{this.state.appName}</p>
                </header>
                <div className={classes.Notes}>
                    {/*<p>NoteInfo will be here!</p>*/}
                    <Note   days={this.state.days}
                            notes={this.state.notes}
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
