import React from "react";
import classes from "./NoteInfo.module.css";

class NoteInfo extends React.Component{ //TODO: COMPONENT NOTES + rename

    constructor(props) {
        super(props);
    }

    render(){
        return (this.props.trigger) ? (
                <div className={classes.NoteInfo}>
                    <div className={classes.InfoInner}>
                        <h3>Info</h3>
                        <button className={classes.CloseBtn} onClick={() => this.props.changeInfoPopup()}>Close</button>
                    </div>
                </div>
            )
            : "";
    }
}

export default NoteInfo;