import { useState } from 'react'
import Logo from "../logo/Logo"
import iconList from "../../data/actionIcons"
import './UserActionList.css'
import {StyledButton} from "../styledButton/StyledButton";

const actionList = [
  'Home',
  'Explore',
  'Notifications',
  'Messages',
  'Lists',
  'Bookmarks',
  // 'Verified',
  'Profile',
  'More'
];

function UserActionList() {
  return(
    <>
      <nav className={'action-list content-style'}>
        {actionList.map(action => {
          return (
            <a className={'action-list__link content-style'} href={'/' + action} key={action}>
              <div className={'action-list__action content-style'}>
                <div>
                  {iconList[action]}
                </div>
                <div className={'action-list__action-name'}>
                  {action}
                </div>
              </div>
            </a>
          )
        })}
        <StyledButton
          variant="contained"
          size="large"
          sx={{
            width: "100%",
            marginTop: "1rem"
          }}
        >
          Doggt
        </StyledButton>
      </nav>
    </>
  )
}

export default UserActionList;