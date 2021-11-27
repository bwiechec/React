import React from "react";
import classes from "./NoteInfo.module.css";
import Note from "../Utils/Note"

class NoteInfo extends React.Component{ //TODO: COMPONENT NOTES + rename

    constructor(props) {
        super(props);
    }

    render(){

        let noteInfoToShow;
        const selectedNote = this.props.notes.map(function(e) { return e.id; }).indexOf(this.props.selectedNoteInfo);
        // console.log(selectedNote);

        // console.log("note info: " + this.props.notes[selectedNote] + this.props.selectedNoteInfo)

        this.props.selectedNoteInfo === null ?
            noteInfoToShow = ""
            :
            noteInfoToShow =
                <div className={classes.InfoDisplay}>
                    <b>DATE: </b>{this.props.notes[selectedNote].dateOf}<br/>
                    <b>TITLE: </b>{this.props.notes[selectedNote].titleOf}<br/>
                    <b>TEXT: </b>{this.props.notes[selectedNote].textOf}
                </div>

        return (this.props.trigger) ? (
                <div className={classes.NoteInfo}>
                    <div className={classes.InfoInner}>
                        <h3>Info</h3>
                        {noteInfoToShow}
                        <button className={classes.CloseBtn} onClick={() => this.props.closeInfoPopup()}>Close</button>
                    </div>
                </div>
            )
            : "";
    }
}

export default NoteInfo;