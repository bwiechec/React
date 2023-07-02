import "./timeline.css"
import {Avatar, Tooltip} from "@mui/material";
import SatelliteOutlinedIcon from "@mui/icons-material/SatelliteOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {StyledButton} from "../styledButton/StyledButton";

function Timeline() {

  const changeSelected = (event) => {

    document
      .querySelector(".timeline-nav__sections-option__text.selected")
      ?.classList
      .remove("selected");

    if(event.target.closest('.timeline-nav__sections-option__text')){
      event
        .target
        .closest('.timeline-nav__sections-option__text')
        .classList
        .add("selected")
    }
    else{
      event
        .target
        .querySelector('.timeline-nav__sections-option__text')
        .classList
        .add("selected")
    }
  }

  return(
    <div className={"timeline content-style"}>
      <div className={"timeline-nav content-style"}>
        <h3 className={"timeline-nav__header"}>
          Home
        </h3>
        <div className={"timeline-nav__sections content-style"}>
          <div className={"timeline-nav__sections-option content-style"} onClick={(event) => changeSelected(event)}>
            <div className={"timeline-nav__sections-option__text selected content-style"}>
              For you
            </div>
          </div>
          <div className={"timeline-nav__sections-option content-style"} onClick={(event) => changeSelected(event)}>
            <div className={"timeline-nav__sections-option__text content-style"}>
              Following
            </div>
          </div>
        </div>
      </div>
      <div className={"timeline-new-post content-style"}>
        <Avatar>
          B
        </Avatar>
        <div
          className={"timeline-new-post__options content-style"}
        >
          <input
            className={"timeline-new-post__input content-style"}
            type={"text"}
            placeholder={"What is happening?!"}
          />
          <div
            className={"timeline-new-post__actions content-style"}
          >
            <div
              className={"timeline-new-post__icons content-style"}
            >
              <Tooltip title="Media">
                <SatelliteOutlinedIcon />
              </Tooltip>

              <Tooltip title="GIF">
                <GifBoxOutlinedIcon />
              </Tooltip>

              <Tooltip title="Poll">
                <BallotOutlinedIcon />
              </Tooltip>

              <Tooltip title="Emoji">
                <SentimentSatisfiedOutlinedIcon />
              </Tooltip>

              <Tooltip title="Schedule">
                <ScheduleOutlinedIcon />
              </Tooltip>

              <Tooltip title="Location">
                <FmdGoodOutlinedIcon />
              </Tooltip>
            </div>

            <StyledButton
              variant="contained"
              className="timeline-new-post__submit content-style"
            >
              Doggt
            </StyledButton>
          </div>
        </div>
      </div>
      <div className={"timeline-content content-style"}>
        test <br />
        test <br />
        test <br />
        test <br />
      </div>
    </div>
  )
}

export default Timeline;