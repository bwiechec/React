import './trendList.css'
import Trend from "../trend/Trend";
import trendsListData from "../../data/trendsListData";

function TrendList(){
  return(
    <div className={"trends content-style"}>
      <h2
        className={"trends__title"}
      >
        Trends for you
      </h2>
      {
        trendsListData.map(
          trend => <Trend element={trend} />
        )
      }
    </div>
  )
}

export default TrendList;