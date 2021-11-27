import React from "react";
import classes from "./Event.module.css";

class Event extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let notesList = [];
        if (this.props.notesList.size === 0) {
            notesList.push(<div className={classes.noEvent} >Brak notatek mozesz stworzyc nowe!</div>);
        }else {

            for(const item of this.props.notesList){ //TODO MAKE IT LIKE ON NOTEINFO (MAP)
                console.log("item" + item);
                if(this.props.day === item.dateOf){
                    notesList.push(<div key={item.id} className={classes.Event}
                        onClick={() => this.props.changeInfoPopup(item.id)}>
                        {item.dateOf}<br/>{item.titleOf} <br/>{item.textOf}</div>)
                }
            }
        }
        console.log(notesList)
        return notesList.length === 0 ? <div className={classes.noEvent} >Brak notatek mozesz stworzyc nowe!</div> : notesList;
    }
}

export default Event;