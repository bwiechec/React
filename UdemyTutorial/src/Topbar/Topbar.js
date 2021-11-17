import React  from "react"
import classes from "./Topbar.module.css"

const Topbar = () => {
    return(
        <header className="App-header">
            <nav className={classes.Topbar}>
                <img src="https://m.media-amazon.com/images/G/08/gc/designs/livepreview/amazon_squidink_noto_email_v2016_fr-main._CB463436975_.png" alt="amazon logo" />
            </nav>
      </header>
    );
}

export default Topbar;