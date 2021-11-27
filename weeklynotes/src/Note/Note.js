import React from "react";
import classes from "./Note.module.css";
import Event from "../Events/Event";

class Note extends React.Component{ // TODO: rename

    constructor(props) {
        super(props);
    }


    render() {
        let note = this.props.days.map((item, pos) => {
            return <div key={pos} className={classes.Note}>
                <div className={classes.NoteDay}>
                    <div className={classes.Day} onClick={function() {alert("Tutaj będzie okno z wszystkimi notatkami z dnia (chyba jednak nie)")}}>{item}</div>
                </div>
                    <Event  notesList={this.props.notes.notesList}
                            day={item}
                            changeInfoPopup={this.props.changeInfoPopup}/>
            </div>
        });
        // console.log(this.props.notes.notesList);

        return note;
    }
}

export default Note;