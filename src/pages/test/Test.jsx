import "./Test.scss";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Test() {
  return (
    <>
      <div className="test">
        <div className="test__messageBox">
          <p className="messageBox__message">{"<테스트 페이지>"}</p>
        </div>
      </div>
    </>
  );
}
