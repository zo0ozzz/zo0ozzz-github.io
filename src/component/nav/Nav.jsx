import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Button1 from "../button1/Button1.jsx";
import Button1List from "../button1List/Button1List";
import LinkList2 from "../linkList2/LinkList2";

export function Nav() {
  const navigate = useNavigate();

  const linkData = [
    { name: "nav1", URL: "#" },
    { name: "nav2", URL: "#" },
    { name: "nav3", URL: "#" },
  ];

  const buttonData = [
    { name: "godMode", onClick: beGod },
    { name: "-", onClick: deleteAllPosts },
    { name: "+", onClick: goCreate },
  ];

  const buttonsElement = buttonData.map(({ name, onClick }, index) => (
    <Button1 name={name} onClick={onClick} key={index} />
  ));

  function beGod() {
    navigate("/god");
  }

  function goCreate() {
    navigate("/create");
  }

  async function deleteAllPosts() {
    try {
      const answer = prompt("삭제할까요?");

      if (answer !== null) {
        const response = await api.delete("/deleteAllData");
        const result = response.data;

        if (response.ok) {
          alert("데이터 삭제 완료.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="nav">
        <Button1List data={buttonData} />
        <LinkList2 data={linkData} />

        {/* <div className="nav-buttons-wrapper">{buttonsElement}</div> */}
        {/* <div className="nav-links-wrapper"> */}
        {/* </div> */}
      </nav>
    </>
  );
}
