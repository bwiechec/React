import React from "react";
import classes from "./Note.module.css";
import Event from "../Events/Event";

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

        month < 10 ?
            month = '0' + month
            :
            month = month

        day < 10 ?
            day = '0' + day
            :
            day = day

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
                                {this.props.days[day%7]}<br/> {currDay}</div>
                        </div>
                            <Event  notesList={this.props.notes.notesList}
                                    day={currDay}
                                    changeInfoPopup={this.props.changeInfoPopup}/>
                    </div>)
            day++;
        }

        // let note = this.props.days.map((item, pos) => {
        //     return <div key={pos} className={classes.Note}>
        //         <div className={classes.NoteDay}>
        //             <div className={classes.Day} onClick={function() {alert("Tutaj będzie okno z wszystkimi notatkami z dnia (chyba jednak nie)")}}>{item}</div>
        //         </div>
        //             <Event  notesList={this.props.notes.notesList}
        //                     day={item}
        //                     changeInfoPopup={this.props.changeInfoPopup}/>
        //     </div>
        // });
        // console.log(this.props.notes.notesList);

        return note;
    }
}

export default Note;