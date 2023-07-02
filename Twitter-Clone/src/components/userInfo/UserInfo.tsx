import { useState } from 'react'
import "./userInfo.css"
import {Avatar} from "@mui/material";

function UserInfo() {
  return(
    <div className={"user-info content-style"}>
      <div className={"user-info-stack content-style"}>
        <Avatar>
          B
        </Avatar>

        <div className={"user-info-user content-style"}>
          <div className={"user-info-user-data content-style"}>
            <div className={"user-info-user-data__name content-style"}>
              Bartek
            </div>
            <div className={"user-info-user-data__id content-style"}>
              @Bartek82052048
            </div>
          </div>
        </div>

        <div className={"user-info-more content-style"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"
               className={"user-info-more__icon content-style"}>
            <g>
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
              >
              </path>
            </g>
          </svg>
        </div>

      </div>
    </div>
  )
}
export default UserInfo;