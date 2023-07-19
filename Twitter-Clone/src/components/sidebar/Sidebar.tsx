import TrendList from "../trendList/TrendList";
import "./sidebar.css"
import {useEffect} from "react";

function Sidebar() {

  let oldScrollY = window.scrollY;
  let prevDirection = 1;

  const swapPositioning = () => {
    const sidebar = document.querySelector('.sidebar-content');
    const buffer = document.querySelector('.sidebar-buffer');

    let top = 0;
    let bottom = 0;

    let marginTop = 1;
    let marginBottom = 1;

    if(sidebar.offsetHeight > window.innerHeight) {
      top = -(sidebar.offsetHeight - window.innerHeight + 10)
      bottom = -(sidebar.offsetHeight - window.innerHeight);

      marginBottom = window.scrollY > (-1 * bottom) ? window.scrollY + bottom : 1;
      marginTop = window.scrollY > (-1 * top) ? window.scrollY + top - bottom : 1;
    }

    if(oldScrollY > window.scrollY && !prevDirection) {
      sidebar.style.bottom = `${bottom ? bottom+'px' : ''}`;
      sidebar.style.top = `${bottom ? '' : top+'px'}`;
      buffer.style.marginTop = `${marginBottom}px`
      prevDirection = 1
    }
    else if(oldScrollY < window.scrollY && prevDirection) {
      sidebar.style.top = `${top}px`;
      sidebar.style.bottom = '';
      buffer.style.marginTop = `${marginTop}px`;
      prevDirection = 0
    }

    oldScrollY = window.scrollY;
  }

  useEffect(
    () => {
      window.onscroll = swapPositioning;
    },
    []
  )

  return(
    <div
      className={"sidebar content-style"}
    >
      <div className={'sidebar-buffer content-style'} />
      <div
        className={'sidebar-content content-style'}
        style={{bottom: "0px"}}
      >
        <div
          className={'sidebar-search content-style'}
          style={{marginTop: "0px"}}
        >
          <label className={"content-style"}>
            <div className={"sidebar-search__icon"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"
                   className="search-icon">
                <g>
                  <path
                    d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z">
                  </path>
                </g>
              </svg>
            </div>

            <div className={"sidebar-search__input"}>
              <input placeholder={"Search doggter"} />
            </div>
          </label>
        </div>
        <TrendList />
      </div>
    </div>
  )
}

export default Sidebar;