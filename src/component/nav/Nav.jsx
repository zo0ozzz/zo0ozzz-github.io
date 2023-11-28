import "./Nav.scss";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Button2 from "../button2/Button2.jsx";
import LinkLi2 from "../linkLi2/LinkLi2.jsx";

export function Nav({ isGod, setIsGod }) {
  const navigate = useNavigate();

  // handler function
  const handleClickLoginButton = () => navigate("/login");

  const handleClickLogoutButton = () => setIsGod((prev) => false);

  const handleClickGoTestPageButton = () => navigate("/test");

  const handleClickSetBlogPageButton = () => navigate("/god");

  const handleClickDeleteAllPostsButton = async () => {
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
  };

  const handleClickCreatePostButton = () => navigate("/create");

  // component rendering data
  const buttonListData = isGod
    ? [
        { name: "quitGodMode", onClick: handleClickLogoutButton },
        { name: "goTestPage", onClick: handleClickGoTestPageButton },
        { name: "goGodpage", onClick: handleClickSetBlogPageButton },
        { name: "-", onClick: handleClickDeleteAllPostsButton },
        { name: "+", onClick: handleClickCreatePostButton },
      ]
    : [{ name: "godMode", onClick: handleClickLoginButton }];

  const linkListData = isGod
    ? [
        { name: "god1", url: "#" },
        { name: "god2", url: "#" },
        { name: "god3", url: "#" },
      ]
    : [
        { name: "user1", url: "#" },
        { name: "user2", url: "#" },
        { name: "user3", url: "#" },
      ];

  // element
  const buttonList = buttonListData.map((buttonData, index) => (
    <Button2
      className="buttonList__button"
      name={buttonData.name}
      onClick={buttonData.onClick}
      key={index}
    />
  ));

  const linkList = linkListData.map((linkData, index) => (
    <LinkLi2
      className="linkList__item"
      name={linkData.name}
      url={linkData.url}
      key={index}
    />
  ));

  return (
    <nav className="nav">
      <div className="nav__buttonList">{buttonList}</div>
      <ul className="nav__linkList">{linkList}</ul>
    </nav>
  );
}
