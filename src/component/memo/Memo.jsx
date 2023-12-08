import "./Memo.scss";
import { useState, useRef, useEffect } from "react";
import ButtonRef from "../buttonRef/ButtonRef";

const Memo = ({ setIsMemo }) => {
  const [content, setContent] = useState("");
  // 드래그 중 요소에 대한 커서의 위치를 유지하기 위한 값(단차)
  const [correctionValue, setCorrectionValue] = useState({ x: 0, y: 0 });
  // 요소의 위치 결정 값
  const [position, setPosition] = useState({ left: null, top: null });
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  // - 지금은 딱히 쓸 일이 없는데.. 일단 놓아둠.
  const memoRef = useRef(null);
  const closeButtonRef = useRef(null);
  const contentRef = useRef(null);

  const resizeObserver = new ResizeObserver(() => {
    const rect = memoRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    console.log(width);
    setSize((prev) => ({ ...prev, wdith: width, height: height }));
  });

  resizeObserver.observe(memoRef.current);

  // useEffect
  useEffect(() => {
    if (localStorage.getItem("memo"))
      setContent((prev) => localStorage.getItem("memo"));

    if (localStorage.getItem("position")) {
      setPosition((prev) => JSON.parse(localStorage.getItem("position")));
    } else {
      setPosition((prev) => ({ left: 0, top: 0 }));
    }

    if (localStorage.getItem("size")) {
      setSize((prev) => JSON.parse(localStorage.getItem("size")));
    } else {
      setSize((prev) => ({ width: 300, height: 300 }));
    }

    const id = setTimeout(() => {
      contentRef.current.focus();
    }, 0);

    return () => {
      clearTimeout(id);
      // document.querySelector(".app").focus();
      // - ref로 해야 하는데,, 일단은.
    };
  }, []);

  // helper function
  const getViewport = (pixelWidth, pixelHeight) => {
    const viewportWidth = window.innerWidth;
    const viewportHight = window.innerHeight;

    const vw = (pixelWidth / viewportWidth) * 100;
    const vh = (pixelHeight / viewportHight) * 100;

    return { left: vw, top: vh };
  };

  // handler function
  const handleChangeContent = (e) => {
    const value = e.target.value;

    localStorage.setItem("memo", value);
    setContent((prev) => value);
  };
  // - 이 핸들러에 localstorage set 코드를 넣어주면 마지막 글자가 저장되지 않음.
  //  - set 함수가 비동기라 입력과 세팅에 시간차가 생기기 때문인 것 같음.
  // - content를 구독하는 useEffect로 메모 내용을 로컬스토리지에 저장하는 식으로 해결.
  // - 아니! 그냥 로컬스토리지에 먼저 저장하면 됨~!

  const handleDragStart = (e) => {
    setIsDragging(true);

    // 드래그 시작 순간 요소 & 커서 간 단차 결정.
    setCorrectionValue((prev) => ({
      ...prev,
      x: e.clientX - memoRef.current.offsetLeft,
      y: e.clientY - memoRef.current.offsetTop,
    }));
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);

    const left = e.clientX - correctionValue.x;
    const top = e.clientY - correctionValue.y;

    localStorage.setItem("position", JSON.stringify(getViewport(left, top)));
  };

  const handleDrag = (e) => {
    if (e.clientX === 0) return;
    // - 드래그가 취소되면 e.client 값이 0으로 바뀐다.
    //  - 그래서 요소의 위치가 의도치 않은 곳으로 가버림.
    //  - 이건 브라우저의 기본 동작인 것 같다. dragEnd 이벤트가 발생하기 전에 발생한다.
    // - 0이 되는 경우엔 바로 return 시켜버리는 동작으로 position의 변화를 막는다.
    //  - e.client 값이 바뀌는 건 막을 수 없지만, 요소 위치 결정에 반영될 수 없게 만들면 되는 것.
    //  - 어차피 요소의 위치는 position 값으로 결정되니까. 이 position
    const left = e.clientX - correctionValue.x;
    const top = e.clientY - correctionValue.y;

    setPosition((prev) => getViewport(left, top));
  };

  const handleResize = (e) => {
    const rect = memoRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    setSize((prev) => ({ ...prev, wdith: width, height: height }));
  };

  const handleClickCloseButton = (e) => setIsMemo(false);

  return (
    <div
      className="memo"
      onResize={handleResize}
      style={
        position.left === null
          ? // - 메모창이 처음 위치에서 이동되는 모습을 보이지 않게 하기 위해.
            { display: "none" }
          : {
              width: `${size.width}px`,
              height: `${size.height}px`,
              left: `${position.left}vw`,
              top: `${position.top}vh`,
            }
      }
      ref={memoRef}
    >
      <div className="memo__topBar">
        <p
          className="memo__label"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          draggable="true"
          // - 메모창의 상태바 잡고 옮기니까 여기만 드래그가 가능하게 하면 됨.
        >
          메모
        </p>
        <ButtonRef
          className="memo__closeButton"
          name="x"
          onClick={handleClickCloseButton}
          ref={closeButtonRef}
        />
      </div>
      <textarea
        className="textarea memo__content"
        value={content}
        onChange={handleChangeContent}
        placeholder="쓸 때마다 자동으로 저장됩니다."
        ref={contentRef}
      />
    </div>
  );
};

export default Memo;
