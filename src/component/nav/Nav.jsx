import "./Nav.scss";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Button1List from "../button1List/Button1List";
import LinkList from "../linkList/LinkList";

export function Nav() {
  const navigate = useNavigate();

  const buttonData = [
    { name: "godMode", onClick: beGod },
    { name: "-", onClick: deleteAllPosts },
    { name: "+", onClick: goCreate },
  ];

  const linkData = [
    { name: "nav1", URL: "#" },
    { name: "nav2", URL: "#" },
    { name: "nav3", URL: "#" },
  ];

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
        const status = response.status;

        if (status === 200) {
          alert("데이터 삭제 완료.");
        } else {
          console.log(status);
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
        <LinkList data={linkData} />
      </nav>
    </>
  );
}
