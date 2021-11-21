import React from "react";
import classes from "./Event.module.css";

class Event extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let notesList = [];
        if (this.props.notesList.size === 0) {
            notesList.push(<div className={classes.Event} >Brak notatek ilosc: {this.props.notesList.size}</div>);
        }else {

            // this.props.notesList.forEach(item =>{
            //     if(this.props.day === item.dateOf){
            //         notesList.push(<div className={classes.Event} onClick={function() {alert("Event selected")}}>
            //             {item.dateOf}<br/>{item.titleOf} <br/>{item.textOf}</div>)
            //     }
            // });

            for(const item of this.props.notesList){
                console.log("item" + item);
                if(this.props.day === item.dateOf){
                    notesList.push(<div key={item.id} className={classes.Event} onClick={function() {alert("Event selected " + item.id)}}>
                        {item.dateOf}<br/>{item.titleOf} <br/>{item.textOf}</div>)
                }
            }
        }
        console.log(notesList)
        return notesList.length === 0 ? <div className={classes.Event} >Brak notatek mozesz stworzyc nowe! {this.props.notesList.size}</div> : notesList;
    }
}

export default Event;