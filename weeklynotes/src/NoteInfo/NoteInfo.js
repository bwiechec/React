import React from "react";
import classes from "./NoteInfo.module.css";
import { trackPromise } from 'react-promise-tracker';
import { Spinner } from '../spinner';

class NoteInfo extends React.Component{ //TODO: MAKE IT NICER

    constructor(props) {
        super(props);
        this.state = {
            selectedNote: null,
            //promiseInProgress: usePromiseTracker()
        }
    }

    getNoteInfo = (id) =>{
        trackPromise(
            fetch('/api/noteSpecificInfo?id=' + id)
                .then(res => res.json())
                .then(noteInfo => {
                    let date = new Date(noteInfo[0].dateOf);
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    month = month < 10 ? '0' + month : month;
                    let day = date.getDate();
                    day = day < 10 ? '0' + day : day;
                    noteInfo[0].dateOf = year + '-' + month + '-' + day;
                    this.setState({selectedNote: noteInfo[0]})
                    this.render()
                }),
            'noteInfo-area',
        );
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedNoteInfo !== prevProps.selectedNoteInfo) {
            if(this.props.selectedNoteInfo !== null)
                await this.getNoteInfo(this.props.selectedNoteInfo)
        }
    }
    clearSelectedNote(){
        this.setState({selectedNote: null});
    }

    render(){
        console.log(this.props.selectedNoteInfo);
        let noteInfoToShow;
        // console.log(selectedNote);

        // console.log("note info: " + this.props.notes[selectedNote] + this.props.selectedNoteInfo)

        this.state.selectedNote === null ?
            noteInfoToShow = ""
            :
            noteInfoToShow =
                <div className={classes.InfoDisplay}>
                    <b>DATE: </b>{this.state.selectedNote.dateOf}<br/>
                    <b>TITLE: </b>{this.state.selectedNote.titleOf}<br/>
                    <b>TEXT: </b>{this.state.selectedNote.textOf}
                </div>

        return (this.props.trigger) ? (
                //this.state.promiseInProgress &&
                <div className={classes.NoteInfo} id="loader">
                    <div className={classes.InfoInner}>
                        <h3>Info</h3>
                        {noteInfoToShow}
                        <button className={classes.CloseBtn} onClick={()=> {this.clearSelectedNote(); this.props.closeInfoPopup()}}>Close</button>
                        <Spinner
                            area={'noteInfo-area'}
                        />
                    </div>
                </div>
            )
            : "";
    }
}

export default NoteInfo;