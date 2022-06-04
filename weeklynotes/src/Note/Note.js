import React from "react";
import classes from "./Note.module.css";
import Event from "../Events/Event";
import {Spinner} from "../spinner";

class Note extends React.Component{ // TODO: rename

    constructor(props) {
        super(props);
    }



    getTodayDate(x){
        const date = new Date();
        date.setDate(date.getDate() + x);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if( month < 10 ){
            month = '0' + month;
        }
        if( day < 10 ){
            day = '0' + day;
        }

        return year + "-" + month + "-" +  day;

    }

    render() {
        let day = new Date().getDay();
        let note = []

        for(let i = 0; i < 7; i++){
            let currDay = this.getTodayDate(i);
            note.push(<div key={currDay} className={classes.Note}>
                        <div className={classes.NoteDay}>
                            <div className={classes.Day} onClick={function() {alert("Tutaj będzie okno z wszystkimi notatkami z dnia (chyba jednak nie)")}}>
                                <b>{this.props.days[day%7]}</b><br/>{currDay}
                            </div>
                        </div>
                            <Spinner
                                area={'noteLoad-area'}
                            />
                            <Event  notesList={this.props.notes.notesList != null ? this.props.notes.notesList : []}
                                    day={currDay}
                                    changeInfoPopup={this.props.changeInfoPopup}/>
                    </div>)
            day++;
        }

        return note;
    }
}

export default Note;