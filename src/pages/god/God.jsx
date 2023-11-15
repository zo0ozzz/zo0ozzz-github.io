import "./God.scss";
import { useEffect, useState } from "react";
import api from "../../lib/axios/axios";
import InputText1 from "../../component/inputText1/InputText1";
import Label1 from "../../component/label/Label1";
import Button1 from "../../component/button1/Button1";

export default function God({
  blogName,
  setBlogName,
  categoryData,
  setCategoryData,
}) {
  const [blogNameTextInputValue, setBlogNameTextInputValue] = useState("");
  // textInput이 blogName이라는 스테이트 값을 value로 가지게 하면
  // textInput의 값을 바꾸는 동시에 화면에 표시되는 블로그 이름이 바뀌게 된다.
  // 랜더링되는 블로그 이름은 확인 버튼을 누르기 전엔 변경되지 않게 하는 게 좋겠음.
  // 그러기 위해선 god 페이지의 blogName을 조정하는 textInput을
  // blogName과는 독립된 스테이트로 관리해줘야 함.
  const [categoryData2, setCategoryData2] = useState([]);
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  console.log("categoryData2: ", categoryData2);

  // mount function
  const getBlogName = async () => {
    const response = await api.get("/god/blogName");
    const status = response.status;
    const data = response.data;

    const blogName = data.blogName;

    if (status === 200) {
      setBlogNameTextInputValue(blogName);
    } else {
      console.log(status);
    }
  };

  const getCategoryData = async () => {
    try {
      const response = await api.get("/god/categoryData");
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const categoryData = data.categoryData;

        setCategoryData2(categoryData);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handler function
  const handleChangeBlogName = (e) => {
    const newBlogName = e.target.value;

    setBlogNameTextInputValue(newBlogName);
  };

  const handleClickBlogNameSubmitButton = async () => {
    try {
      const newBlogName = blogNameTextInputValue;

      const response = await api.patch("/god/blogName", {
        blogName: newBlogName,
      });
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setBlogName(newBlogName);

        alert(`블로그 이름이 <${data.blogName}>으로 변경되었습니다.`);
      } else {
        console.log(status);
      }
    } catch (error) {}
  };

  // useEffect
  useEffect(() => {
    getBlogName();
  }, []);

  useEffect(() => {
    getCategoryData();
  }, []);

  const blogNameTextInputId = "blogNameTextInput";

  const blogNameLabelData = {
    name: "블로그 이름:",
    htmlFor: blogNameTextInputId,
  };

  const blogNameTextInputData = {
    value: blogNameTextInputValue,
    onChange: handleChangeBlogName,
    id: blogNameTextInputId,
    name: blogNameTextInputId,
  };

  const blogNameSubmitButtonData = {
    name: "확인",
    onClick: handleClickBlogNameSubmitButton,
  };

  const categoryLabelData = {
    name: "카테고리 수정: ",
  };

  const categoryCreateButtonData = {
    name: "+",
  };

  const categoryUpButtonData = {
    name: "up",
  };

  const categoryDownButtonData = {
    name: "down",
  };

  const categorySubmitButtonData = {
    name: "확인",
  };

  const categoryList = categoryData2.map(({ name, postCount }, index) => {
    const isSelected = index === selectedIndex;

    return (
      <>
        <span
          className={`god-category-categoryList-item ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedIndex(index);
          }}
        >{`${name}(${postCount})`}</span>
      </>
    );
  });

  return (
    <>
      <div className="god">
        <p className="message">{`나는 신이야!`}</p>
        <div className="god-blogName">
          <Label1 data={blogNameLabelData} />
          <InputText1 data={blogNameTextInputData} />
          <Button1 data={blogNameSubmitButtonData} />
        </div>
        <div className="god-category">
          <Label1 data={categoryLabelData} />
          <div className="god-categorySettingButtons">
            <Button1 data={categoryCreateButtonData} />
            <Button1 data={categoryUpButtonData} />
            <Button1 data={categoryDownButtonData} />
          </div>
          <div className="god-category-categoryList">{categoryList}</div>
          <Button1 data={categorySubmitButtonData} />
        </div>
      </div>
    </>
  );
}
