import React from "react";
import classes from "./Event.module.css";

class Event extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let notesList = [];
        if (this.props.notesList.size === 0) {
            notesList.push(<div className={classes.noEvent} >You didn't add any notes for today yet, if you can create some!</div>);
        }else {

            for(const item of this.props.notesList){ //TODO MAKE IT LIKE ON NOTEINFO (MAP) OR AT LEAST CONSIDER IT
                console.log("item" + item);
                if(this.props.day === item.dateOf){
                    notesList.push(
                        <div key={item.id} className={classes.Event} onClick={() => this.props.changeInfoPopup(item.id)}>
                            <p>
                                {item.dateOf}<br/>{item.titleOf}
                            </p>
                        </div>)
                }
            }
        }
        console.log(notesList)
        return notesList.length === 0 ?
            <div className={classes.noEvent} >You didn't add any notes for today yet, if you can create some</div>
            :
            notesList;
    }
}

export default Event;