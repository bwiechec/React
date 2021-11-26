import React from "react";
import classes from "./AddNote.module.css";

class AddNote extends React.Component{ //TODO: COMPONENT AddNote

    constructor(props) {
        super(props);

        this.state = {
            DateInputValue: '',
            TitleInputValue: '',
            TextInputValue: ''
        };
    }

    updateDateInputValue = (input) =>{
        this.setState({
            DateInputValue: input.target.value
        })
    }

    updateTitleInputValue = (input) =>{
        this.setState({
            TitleInputValue: input.target.value
        })
    }

    updateTextInputValue = (input) =>{
        this.setState({
            TextInputValue : input.target.value
        })
    }

    submitBtnFunc = () =>{
        this.props.addNewEvent(this.state.DateInputValue, this.state.TitleInputValue, this.state.TextInputValue);
        this.props.changeBtnPopup();
    }

    render(){
        return (this.props.trigger) ? (
            <div className={classes.Add}>
                <div className={classes.AddInner}>
                    <h3>Add new note</h3>
                    <button className={classes.CloseBtn} onClick={() => this.props.changeBtnPopup()}>Close</button>
                    {/*Date: <input type="date" name='date' onChange={evt => this.updateDateInputValue(evt)}/><br/>*/}
                    Date: <input type="text" name='date' onChange={evt => this.updateDateInputValue(evt)}/><br/>
                    Title: <input type="text" name='title' onChange={evt => this.updateTitleInputValue(evt)}/><br/>
                    Text: <input type="text"  name='text' onChange={evt => this.updateTextInputValue(evt)}/><br/>
                    <button onClick={() =>this.submitBtnFunc()}>SUBMIT</button>
                </div>
            </div>
        )
        : "";
    }
}

export default AddNote;