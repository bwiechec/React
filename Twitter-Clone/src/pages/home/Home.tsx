import {useEffect} from "react";
import './home.css'
import TrendList from '../../components/trendList/TrendList'
import {Avatar, Tooltip} from "@mui/material";
import SatelliteOutlinedIcon from '@mui/icons-material/SatelliteOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Sidebar from "../../components/sidebar/Sidebar"

import {StyledButton} from '../../components/styledButton/StyledButton'
import Timeline from "../../components/timeline/Timeline";

function Home(){

  return(
    <main className={"main-panel content-style"}>
      <div className={"main-panel-content content-style"}>
        <div className={"main-panel-content2 content-style"}>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </main>
  )
}

export default Home;