import { useState } from 'react'
import "./banner.css"
import UserActionList from '../userActionList/UserActionList'
import UserInfo from '../userInfo/UserInfo'
import Logo from "../logo/Logo";

function Banner() {
  return(
    <header
      role="banner"
      className={"banner content-style"}
    >
      <div
        className={"banner-user content-style"}
      >
        <div
          className={"banner-user-fix content-style"}
        >
          <div
            className={"banner-user-fix-list content-style"}
          >
            <div
              className={"banner-user-fix-list__action-list content-style"}
            >
              <Logo />

              <UserActionList />
            </div>

            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner