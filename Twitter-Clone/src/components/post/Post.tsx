import "./post.css"
import moment from 'moment'
import {Avatar} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';

function Post(props) {

  const unitlist = ["","K","M","G"];

  function formatNumber(number){
    const sign = Math.sign(number);
    let unit = 0;

    while(Math.abs(number) >= 1000)
    {
      unit = unit + 1;
      number = Math.floor(Math.abs(number) / 100)/10;
    }
    return(sign * Math.abs(number) + unitlist[unit]);
  }

  return(
    <div className={"post content-style"}>
      <Avatar>
        {props.postData.creatorName[0]}
      </Avatar>

      <div className={"post-data"}>
        <div className={"post-data__info content-style"}>
          <div className={"info-creator"}>
            {props.postData.creatorName}
          </div>
          <div className={"info-login"}>
            @{props.postData.creatorLogin}
          </div>
          ·
          <div className={"info-time"}>
            {moment(props.postData.postTimestamp, 'YYYY/MM/DD hh:mm:ss').fromNow(true)}
          </div>
        </div>

        <div className={"post-data__content"}>
          {props.postData.postContent}
          {props.postData.img !== null ?
            <img
              src={props.postData.img}
              className={"post-data__content-image"}
            />
            :
            null}
        </div>

        <div className={"post-data__stats"}>
          <div className={"stat stat-reply"}>
            <ChatBubbleOutlineOutlinedIcon />
            {formatNumber(props.postData.replyCount)}
          </div>
          <div className={"stat stat-redogg"}>
            <AutorenewOutlinedIcon />
            {formatNumber(props.postData.redoggsCount)}
          </div>
          <div className={"stat stat-like"}>
            <FavoriteBorderOutlinedIcon />
            {formatNumber(props.postData.likeCount)}
          </div>
          <div className={"stat stat-views"}>
            <EqualizerOutlinedIcon />
            {formatNumber(props.postData.viewCount)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;