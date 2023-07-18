import './trend.css'

function Trend(props) {
  return(
    <div className={"trend"}>
      <div className={"trend-content"}>
        <div className={"trend__location trend__lower-text"}>
          Trending in Poland
        </div>
        <div className={"trend__tag"}>
          {props.element.name}
        </div>
        <div className={"trend__count trend__lower-text"}>
          {props.element.count}
        </div>
        <div className={"trend__more"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"
               className="">
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

export default Trend;