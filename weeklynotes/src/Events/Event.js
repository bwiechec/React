import React from "react";
import classes from "./Event.module.css";

class Event extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        let notesList;
        if (this.props.notesList.size === 0) {
            notesList = <div>Brak notatek ilosc: {this.props.notesList.size}</div>
        }else {
            notesList = this.props.notesList.map((item, pos) => {
                return this.props.day === item.dateOf ? <div key={pos} className={classes.Event}>{item.dateOf + '\n' + item.titleOf
                    + '\n' + item.textOf}</div> :
                    null
            })
        }
        return notesList;
    }
}

export default Event;