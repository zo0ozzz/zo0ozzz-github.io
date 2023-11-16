import "./Test.scss";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Test() {
  const [testArray, setTestArray] = useState([
    { name: "바보" },
    { name: "멍청이" },
    { name: "해삼" },
    { name: "멍게" },
    { name: "말미잘" },
  ]);
  console.log([...testArray]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const handleTestArr = (array) => {
    const newArray = [...array];
    newArray[selectedIndex - 1] = selectedItem;
    newArray[selectedIndex] = array[selectedIndex - 1];

    setTestArray(newArray);
    setSelectedIndex((prev) => prev - 1);
  };

  const testList = testArray.map((item, index) => {
    const isSelected = index === selectedIndex;

    return (
      <span
        key={index}
        className={`item ${isSelected ? "selected" : ""}`}
        onClick={() => {
          setSelectedIndex(index);
          setSelectedItem((prev) => ({ ...prev, ...item }));
        }}
      >{`${item.name}(0)`}</span>
    );
  });

  return (
    <>
      <div className="test">
        <div className="test-info">
          <p style={{ fontWeight: "bold", margin: "10px 5px 10px 5px" }}>
            {`<테스트 페이지>`}
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => handleTestArr(testArray)}>up</button>
        </div>
        <div className="list">{testList}</div>
      </div>
    </>
  );
}
