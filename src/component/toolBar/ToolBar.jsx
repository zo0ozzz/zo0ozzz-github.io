import "./ToolBar.scss";
import Searcher from "../searcher/Searcher";
import SortingSelector from "../sortingSelector/SortingSelector";

export default function ToolBar({
  sortingMedthodData,
  selectedSortingMedthod,
  setSelectedSortingMedthod,
}) {
  return (
    <div className="toolBar">
      <Searcher />
      <SortingSelector
        sortingMedthodData={sortingMedthodData}
        selectedSortingMedthod={selectedSortingMedthod}
        setSelectedSortingMedthod={setSelectedSortingMedthod}
      />
    </div>
  );
}
