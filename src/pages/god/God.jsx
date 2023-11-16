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
  const [godBlogName, setGodBlogName] = useState("");
  // textInput이 blogName이라는 스테이트 값을 value로 가지게 하면
  // textInput의 값을 바꾸는 동시에 화면에 표시되는 블로그 이름이 바뀌게 된다.
  // 랜더링되는 블로그 이름은 확인 버튼을 누르기 전엔 변경되지 않게 하는 게 좋겠음.
  // 그러기 위해선 god 페이지의 blogName을 조정하는 textInput을
  // blogName과는 독립된 스테이트로 관리해줘야 함.
  // god 페이지에서만 쓰이는 변수를 만들어서 그걸 조작해야겠음.
  const [godCategoryData, setGodCategoryData] = useState([]);
  console.log(godCategoryData);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  console.log(selectedCategoryIndex);

  // mount function
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

  const getCategoryData = async () => {
    try {
      const response = await api.get("/god/categoryData");
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const categoryData = data.categoryData;

        setGodCategoryData((prev) => categoryData);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handler function
  const handleChangeGodBlogName = (e) => {
    const newBlogName = e.target.value;

    setGodBlogName(newBlogName);
  };

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

        alert(`블로그 이름이 <${data.blogName}>으로 변경되었습니다.`);
      } else {
        console.log(status);
      }
    } catch (error) {}
  };

  const handleClickMoveUpSelectedCategoryButton = () => {
    const getArrayTargetElementMoveForward = (array, index) => {
      const targetElement = array[index];
      const newArray = [...array];

      newArray[index - 1] = targetElement;
      newArray[index] = array[index - 1];

      return newArray;
    };

    if (selectedCategoryIndex > 0) {
      const newGodCategoryData = getArrayTargetElementMoveForward(
        godCategoryData,
        selectedCategoryIndex
      );

      setGodCategoryData((prev) => newGodCategoryData);
      setSelectedCategoryIndex((prev) => prev - 1);
      return;
    }

    if (selectedCategoryIndex === 0) {
      console.log(1);

      return;
    }
  };

  const handleClickMoveDownSelectedCategoryButton = () => {
    const getArrayTargetElementMoveBackward = (array, index) => {
      const targetElement = array[index];
      const newArray = [...array];
      newArray[index + 1] = targetElement;
      newArray[index] = array[index + 1];

      return newArray;
    };

    if (selectedCategoryIndex < godCategoryData.length - 1) {
      const newGodCategoryData = getArrayTargetElementMoveBackward(
        godCategoryData,
        selectedCategoryIndex
      );

      setGodCategoryData((prev) => newGodCategoryData);
      setSelectedCategoryIndex((prev) => prev + 1);

      console.log("클릭");
    }

    if (selectedCategoryIndex === godCategoryData.length - 1) return;
  };

  const handleClickCreateNewCategoryButton = () => {
    const newCategoryName = prompt("추가할 카테고리명을 입력해주세요.");

    if (newCategoryName !== null && newCategoryName !== "") {
      const newGodCategoryData = [...godCategoryData];
      newGodCategoryData.push({
        isRepresentative: false,
        name: newCategoryName,
        postCount: 0,
      });

      setGodCategoryData(newGodCategoryData);

      return;
    } else {
      alert("카테고리 이름을 입력해주세요.");
    }
  };

  const handleClickDeleteSelectedCategoryButton = () => {
    const getArrayTargetElementDelete = (array, index) => {
      const newArray = [...array];
      newArray.splice(index, 1);

      return newArray;
    };

    if (
      selectedCategoryIndex < godCategoryData.length &&
      selectedCategoryIndex !== null
    ) {
      const newGodCategoryData = getArrayTargetElementDelete(
        godCategoryData,
        selectedCategoryIndex
      );

      setGodCategoryData((prev) => newGodCategoryData);

      return;
    } else return;
  };

  const handleClickSelectedCategoryAsRepresentativeButton = () => {
    const newGodCategoryData = [...godCategoryData].map((item, index) => {
      if (selectedCategoryIndex === index) {
        const newItem = { ...item, isRepresentative: true };

        return newItem;
      }

      if (selectedCategoryIndex !== index) {
        const newItem = { ...item, isRepresentative: false };

        return newItem;
      }
    });

    setGodCategoryData((prev) => newGodCategoryData);
  };

  // useEffect
  useEffect(() => {
    getBlogName();
  }, []);

  // useEffect(() => {
  //   getCategoryData();
  // }, []);

  useEffect(() => {
    setGodCategoryData([
      {
        isAllCategory: true,
        isRepresentative: true,
        id: 0,
        order: 0,
        name: "전체",
        postCount: 2,
      },
      {
        isRepresentative: false,
        id: 2,
        order: 1,
        name: "블로그",
        postCount: 0,
      },
      {
        isRepresentative: false,
        id: 3,
        order: 2,
        name: "기타",
        postCount: 0,
      },
      {
        isRepresentative: false,
        id: 4,
        order: 3,
        name: "뿅뿅뿅",
        postCount: 1,
      },
      {
        isRepresentative: false,
        isNoCategory: true,
        id: 1,
        order: 4,
        name: "미분류",
        postCount: 1,
      },
    ]);
  }, []);

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

  const categoryLabelData = {
    name: "카테고리 수정: ",
  };

  const moveUpSelectedCategoryButtonData = {
    name: "up",
    onClick: handleClickMoveUpSelectedCategoryButton,
  };

  const moveDownSelectedCategoryButtonData = {
    name: "down",
    onClick: handleClickMoveDownSelectedCategoryButton,
  };

  const createNewCategoryButtonData = {
    name: "+",
    onClick: handleClickCreateNewCategoryButton,
  };

  const deleteSelectedCategoryButtonData = {
    name: "-",
    onClick: handleClickDeleteSelectedCategoryButton,
  };

  const setSelectedCategoryAsRepresentativeButtonData = {
    name: "대표로 설정",
    onClick: handleClickSelectedCategoryAsRepresentativeButton,
  };

  const categorySubmitButtonData = {
    name: "확인",
  };

  const categoryList = godCategoryData.map(
    ({ id, name, postCount, isRepresentative = false }, index) => {
      const isSelected = index === selectedCategoryIndex;

      if (isRepresentative === true) {
        return (
          <>
            <span
              key={index}
              className={`god-category-categoryList-item ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedCategoryIndex(index);
              }}
            >{`${name}(${postCount})(대표)`}</span>
          </>
        );
      }

      return (
        <>
          <span
            key={index}
            className={`god-category-categoryList-item ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedCategoryIndex(index);
            }}
          >{`${name}(${postCount})`}</span>
        </>
      );
    }
  );

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
            <Button1 data={moveUpSelectedCategoryButtonData} />
            <Button1 data={moveDownSelectedCategoryButtonData} />
            <Button1 data={createNewCategoryButtonData} />
            <Button1 data={deleteSelectedCategoryButtonData} />
            <Button1 data={setSelectedCategoryAsRepresentativeButtonData} />
          </div>
          <div className="god-category-categoryList">{categoryList}</div>
          <Button1 data={categorySubmitButtonData} />
        </div>
      </div>
    </>
  );
}
