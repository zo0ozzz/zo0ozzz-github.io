import "./ToolBar.scss";
import Searcher from "../searcher/Searcher";
import SortingSelector from "../sortingSelector/SortingSelector";

export default function ToolBar({ sortName, setSortName, sortingMedthodData }) {
  return (
    <div className="toolBar">
      <Searcher />
      <SortingSelector
        sortName={sortName}
        setSortName={setSortName}
        sortingMedthodData={sortingMedthodData}
      />
    </div>
  );
}
