import classes from './App.module.css';
import React from "react";
import Note from './Note/Note'
import Notes from "./Utils/Notes";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            appName: 'Weekly Notes',
            author: 'Bartosz Wiecheć',
            days: ['pn', 'wt', 'sr', 'czw', 'pt', 'sb', 'nd'],
            notes: new Notes()
        };
    }

    render(){
        return (
            <div className={classes.App}>
                <header className={classes.AppHeader}>
                    <p>{this.state.appName}</p>
                </header>
                <div className={classes.Notes}>
                    {/*<p>Notes will be here!</p>*/}
                    <Note   days={this.state.days}
                            notes={this.state.notes}/>
                </div>
                <footer className={classes.AppFooter}>
                    <p>Author: {this.state.author}</p>
                </footer>
            </div>
        );
    }
}

export default App;
