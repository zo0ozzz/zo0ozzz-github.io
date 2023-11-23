import "./BlogNameEditor.scss";
import { useEffect, useState } from "react";
import api from "../../lib/axios/axios";
import InputText1 from "../../component/inputText1/InputText1";
import Label1 from "../../component/label/Label1";
import Button1 from "../../component/button1/Button1";

export default function ({ setBlogName }) {
  const [godBlogName, setGodBlogName] = useState("");
  /*
  textInput이 blogName이라는 스테이트 값을 value로 가지게 하면
  textInput의 값을 바꾸는 동시에 화면에 표시되는 블로그 이름이 바뀌게 된다.
  랜더링되는 블로그 이름은 확인 버튼을 누르기 전엔 변경되지 않게 하는 게 좋겠음.
  그러기 위해선 god 페이지의 blogName을 조정하는 textInput을
  blogName과는 독립된 스테이트로 관리해줘야 함.
  god 페이지에서만 쓰이는 변수를 만들어서 그걸 조작해야겠음.
	*/

  // * mount function
  const getBlogName = async () => {
    const response = await api.get("/god/blogName");
    const status = response.status;
    const data = response.data;

    const blogName = data.blogName;

    if (status === 200) {
      setGodBlogName((prev) => blogName);
    } else {
      console.log(status);
    }
  };

  // * useEffect
  useEffect(() => {
    getBlogName();
  }, []);

  // * handler function
  // 블로그 이름 입력 인풋 값 교체
  const handleChangeGodBlogName = (e) => {
    const newBlogName = e.target.value;

    setGodBlogName(newBlogName);
  };

  // 새로운 블로그 이름을 db에 전송
  const handleClickGodBlogNameSubmitButton = async () => {
    try {
      const newBlogName = godBlogName;

      const response = await api.patch("/god/blogName", {
        blogName: newBlogName,
      });
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setBlogName((prev) => newBlogName);
        // 블로그 이름 스테이트 값을 바꿔줄 필요가 있나?
        // -> 있음. 헤더가 렌더링 될 때 서버에서 데이터를 받아오는 거라 바로 반영이 안 되니까.
        // - 그러면 제출 시 새로고침을 해주면 되는 거 아닌가?
        // -> 맞음.. 그렇게 바꿀까? 그러면 프롭스로 blogName, categoryData 안 가져와도 될 것 같은데..
        // -> 새로고침으로 업데이트 해주려면 이렇게 해주면 됨. window.location.replace("/god");
        // - 근데 새로고침으로 최신화하면 다 초기화되니까, 그냥 state를 조정해주는 것도 괜찮을 듯.
        // - 카테고리바는 어차피 god 페이지에서 안 보이니까 state로 제어하지 않고 db만 바꿔줘도 될 것 같음!
        alert(`블로그 이름이 <${data.blogName}>으로 변경되었습니다.`);
      } else {
        console.log(status);
      }
    } catch (error) {}
  };

  // component rendering data
  const blogNameTextInputId = "blogNameTextInput";

  const blogNameLabelData = {
    name: "블로그 이름:",
    htmlFor: blogNameTextInputId,
  };

  const blogNameTextInputData = {
    value: godBlogName,
    onChange: handleChangeGodBlogName,
    id: blogNameTextInputId,
    name: blogNameTextInputId,
  };

  const blogNameSubmitButtonData = {
    name: "확인",
    onClick: handleClickGodBlogNameSubmitButton,
  };
  return (
    <>
      {" "}
      <div className="blogNameEditor">
        <Label1 data={blogNameLabelData} />
        <InputText1 data={blogNameTextInputData} />
        <Button1 data={blogNameSubmitButtonData} />
      </div>
    </>
  );
}
