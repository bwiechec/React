import { useState } from 'react'
import doge from '../../assets/doge.png'
import './Logo.css'

function Logo() {
  return(
    <div
      className={"logo content-style"}
    >
      <a
        href={"/"}
        className={"logo-link content-style"}
      >
        <img
          src={doge}
          alt="Dogger"
          className={"logo-link__img"}
        />
      </a>
    </div>
  )
}

export default Logo;