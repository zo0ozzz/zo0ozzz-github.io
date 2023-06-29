import "./App.scss";
import { PageHeader } from "./component/PageHeader";
import { HomeHellow } from "./component/HomeHellow";
import { HomeContentList } from "./component/HomeContentList";
// import { MonthList } from "./component/MonthList";

function App() {
  return (
    <>
      <PageHeader />
      <HomeHellow />
      <HomeContentList />
    </>
  );
}

export default App;
