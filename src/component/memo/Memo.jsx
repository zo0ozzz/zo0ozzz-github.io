import "./Memo.scss";
import { useState, useRef, useEffect } from "react";
// import QuillMemo from "../../lib/Quill/QuillMemo";
import Button2 from "../button2/Button2";

const Modal = ({ isMemo }) => {
  const [content, setContent] = useState("");
  // 드래그 중 요소에 대한 커서의 위치를 유지하기 위한 값(단차)
  const [correctionValue, setCorrectionValue] = useState({ x: 0, y: 0 });
  // 드래그 중에 요소의 위치를 결정하는 값
  const [positionOnDragging, setPositionOnDragging] = useState({
    left: 0,
    top: 0,
  });
  // 드래그가 끝났을 때 요소의 위치를 결정하는 값
  const [positionNotOnDragging, setPositionNotOnDragging] = useState({
    left: 0,
    top: 0,
  });
  console.log("positionOnDragging", positionOnDragging);
  console.log("positionNotOnDragging", positionNotOnDragging);
  // - 드래그 이벤트는 드래그가 끝나면 그 요소를 그 자리에 돌려놓음.
  //  - 드래그가 끝나는 즉시 positionOnDragging 값은 left 0, top 0으로 되돌아간다.
  //  - 이건 중지시킬 수가 없는 것 같음. e.preventDefault()를 해도 안 됨.
  // - 그래서 생각해낸 방법이, left 0 top 0이 되기 전에 그 값을 다른 변수에 저장시키는 것.
  // - 드래그 과정에서 설정된 요소의 positionOnDragging 값이 드래그 종료 직전에 여기 저장됨.
  // - isDragging이 false로 전환되면 요소에 적용되는 style 객체를
  // - positionOnDragging 값에 기반한 객체에서 positionNotOnDragging 값에 기반한 객체로 교체해줌.
  const [isDragging, setIsDragging] = useState(false);
  const memoRef = useRef(null);

  const handleChangeContent = (e) => setContent((prev) => e.target.value);
  // - 이 핸들러에 localstorage set 코드를 넣어주면 마지막 글자가 저장되지 않음.
  //  - set 함수가 비동기라 입력과 세팅에 시간차가 생기기 때문인 것 같음.
  // - content를 구독하는 useEffect로 메모 내용을 로컬스토리지에 저장하는 식으로 해결.

  const handleDragStartTopBar = (e) => {
    setIsDragging(true);

    setCorrectionValue((prev) => ({
      ...prev,
      x: e.clientX - memoRef.current.offsetLeft,
      y: e.clientY - memoRef.current.offsetTop,
    }));
  };

  const handleDragEndTopBar = () => {
    setIsDragging(false);
  };

  const handleDragTopBar = (e) => {
    setPositionOnDragging((prev) => ({
      ...prev,
      left: e.clientX - correctionValue.x,
      top: e.clientY - correctionValue.y,
    }));
  };

  useEffect(() => {
    if (isMemo === true) {
      setContent((prev) => localStorage.getItem("memo"));
      setPositionNotOnDragging((prev) => ({
        ...prev,
        ...JSON.parse(localStorage.getItem("position")),
      }));
      console.log(JSON.parse(localStorage.getItem("position")));
      console.log(positionNotOnDragging);
    } else {
      // localStorage.setItem("position", JSON.stringify(positionNotOnDragging));
    }
  }, [isMemo]);

  useEffect(() => {
    if (positionOnDragging.left === 0 - correctionValue.x) {
      return;
    } else {
      setPositionNotOnDragging((prev) => positionOnDragging);
    }
  }, [positionOnDragging]);

  useEffect(() => {
    if (isDragging === false) {
      setPositionOnDragging((prev) => positionNotOnDragging);
    } else {
      localStorage.setItem("position", JSON.stringify(positionOnDragging));
    }
  }, [isDragging]);

  useEffect(() => {
    localStorage.setItem("memo", content);
  }, [content]);

  useEffect(() => {
    // if (positionNotOnDragging.left === 0) return;
  }, [positionNotOnDragging]);

  return (
    <div
      className="memo"
      style={
        isDragging
          ? {
              left: `${positionOnDragging.left}px`,
              top: `${positionOnDragging.top}px`,
            }
          : {
              left: `${positionNotOnDragging.left}px`,
              top: `${positionNotOnDragging.top}px`,
            }
      }
      ref={memoRef}
    >
      <div className="memo__topBar">
        <p
          className="memo__label"
          onMouseDown={handleDragStartTopBar}
          // onDragStart={handleDragStartTopBar}
          onDragEnd={handleDragEndTopBar}
          onDrag={handleDragTopBar}
          draggable="true"
        >
          메모장
        </p>
        <Button2 className="memo__closeButton" name="x" />
      </div>
      <textarea
        className="textarea memo__content"
        value={content}
        onChange={handleChangeContent}
      />
    </div>
  );
};

export default Modal;
