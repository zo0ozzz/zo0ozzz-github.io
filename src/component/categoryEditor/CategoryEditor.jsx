import "./CategoryEditor.scss";
import { useEffect, useState, useRef } from "react";
import api from "../../lib/axios/axios";
import InputText1 from "../../component/inputText1/InputText1";
import Label1 from "../../component/label/Label1";
import Button1 from "../../component/button1/Button1";

export default function CategoryEditor({ setCategoryData }) {
  const [godCategoryData, setGodCategoryData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [isStepForNamingNewCategory, setIsStepForNamingNewCategory] =
    useState(false);
  const [newCategoryTextInputValue, setNewCategoryTextInputValue] =
    useState("");
  const [isDisabled, setIsDisabled] = useState({
    createNewCategoryButton: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const newCategoryTextInputRef = useRef(null);

  const getCategoryData = async () => {
    try {
      const response = await api.get("/god/categoryData");
      const status = response.status;
      const data = response.data;

      const categoryData = data.categoryData;

      if (status === 200) {
        setGodCategoryData((prev) => categoryData);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickMoveUpSelectedCategoryButton = () => {
    // 선택된 인덱스의 요소를 한 칸 앞으로 보낸 새로운 배열을 반환하는 함수
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

    // 배열의 첫 번째 요소가 선택된 경우 아무 동작도 하지 않음.
    if (selectedCategoryIndex === 0) return;
  };

  // 카테고리 순서를 한 칸 뒤로
  const handleClickMoveDownSelectedCategoryButton = () => {
    // 선택된 인덱스의 요소를 한 칸 뒤로 보낸 새로운 배열을 반환하는 함수
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
    }

    // 배열의 마지막 요소가 선택된 경우 아무 동작도 하지 않음.
    if (selectedCategoryIndex === godCategoryData.length - 1) return;
  };

  // 새 카테고리 생성
  const handleClickCreateNewCategoryButton = () => {
    // 스테이트 값을 조정해 맨 밑에 input + button 요소를 등장시킴.
    // 바로 요소가 추가되는 게 아니라서 카테고리가 완성되지 않아도 따로 조치 취할 필요 없음.
    setIsStepForNamingNewCategory((prev) => true);

    // 새로운 카테고리 입력이 완료될 때까지 + 버튼을 비활성화 시킴.
    setIsDisabled((prev) => ({ ...prev, createNewCategoryButton: true }));
  };

  // 선택된 카테고리 삭제
  const handleClickDeleteSelectedCategoryButton = () => {
    // 선택된 인덱스의 요소를 뺀 새로운 배열을 반환하는 함수
    const getArrayTargetElementDelete = (array, index) => {
      const newArray = [...array];
      newArray.splice(index, 1);

      return newArray;
    };

    const isAllCategory = godCategoryData[selectedCategoryIndex]?.isAllCategory;
    const isNoCategory = godCategoryData[selectedCategoryIndex]?.isNoCategory;

    if (selectedCategoryIndex !== null) {
      if (isAllCategory || isNoCategory) {
        // - 전체, 미분류 카테고리는 삭제할 수 없게.
        alert("이 카테고리는 삭제할 수 없으셈!!!");
      } else {
        const newGodCategoryData = getArrayTargetElementDelete(
          godCategoryData,
          selectedCategoryIndex
        );

        setGodCategoryData((prev) => newGodCategoryData);
      }
    } else return;
    // - 선택된 카테고리가 없이(null) 버튼이 눌리면 아무 동작도 하지 않음.
  };

  // 선택된 카테고리를 대표 카테고리로 지정.
  const handleClickSelectedCategoryAsRepresentativeButton = () => {
    // 선택된 인덱스 요소의 isRepresentative 항목을 true로 이외는 false로 설정한 새로운 배열을 반환하는 함수
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

  // 새로운 카테고리 생성 시에 사용되는 인풋 값 설정 핸들러
  const handleChangeNewCategoryTextInput = (e) => {
    const value = e.target.value;

    setNewCategoryTextInputValue(value);
  };

  const handleClickCategorySubmitButton = async () => {
    try {
      const response = await api.patch(
        "/post/updateCategoryData",
        godCategoryData
      );
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setCategoryData((prev) => data);
        alert("카테고리 변경 성공!");
      } else {
        console.log(status);
        alert("카테고리 변경 실패ㅠㅠ 오류 찾아라~~~");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCompleteCreatingNewCategoryButton = () => {
    const checkDuplicateCategoryName = () => {
      const result = godCategoryData.findIndex(
        ({ name }) => name === newCategoryTextInputValue
      );

      if (result !== -1) {
        return true;
      }

      if (result === -1) {
        return false;
      }
    };

    if (
      newCategoryTextInputValue !== "" &&
      checkDuplicateCategoryName() === false
    ) {
      const newGodCategoryData = [...godCategoryData];
      newGodCategoryData.push({
        name: newCategoryTextInputValue,
        postCount: 0,
        id: Date.now(),
      });

      setGodCategoryData((prev) => newGodCategoryData);
      setIsStepForNamingNewCategory((prev) => false);
      setNewCategoryTextInputValue((prev) => "");
      setSelectedCategoryIndex((prev) => godCategoryData.length);
      setIsDisabled((prev) => ({ ...prev, createNewCategoryButton: false }));

      return;
    }

    if (newCategoryTextInputValue === "") {
      alert("아차차~ 카테고리 이름을 안 지었네~~~");

      return;
    }

    if (checkDuplicateCategoryName() === true) {
      alert("똑같은 이름이 이미 있잖아~~~");

      return;
    }
  };

  const handleClickCancelCreatingNewCategoryButton = () => {
    setIsStepForNamingNewCategory((prev) => false);
    setIsDisabled((prev) => ({ ...prev, createNewCategoryButton: false }));
  };

  const handleClickChangeSelectedCategoryNameButton = () => {
    setEditMode(true);
    setEditedCategoryName(godCategoryData[selectedCategoryIndex].name);
  };

  const handleChangeEditingSelectedCategoryNameTextInput = (e) => {
    const newCategoryName = e.target.value;

    setEditedCategoryName(newCategoryName);
  };

  const handleClickCompeleteEditingSelectedCategoryNameButton = () => {
    const newGodCategoryData = [...godCategoryData];
    const prevElement = newGodCategoryData[selectedCategoryIndex];
    newGodCategoryData[selectedCategoryIndex] = {
      ...prevElement,
      name: editedCategoryName,
    };

    setGodCategoryData(newGodCategoryData);
    setEditMode((prev) => false);
  };

  const handleClickCancelEditingSelectedCategoryNameButton = () => {
    setEditMode((prev) => false);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    if (isStepForNamingNewCategory === true) {
      newCategoryTextInputRef.current.focus();
    } else return;
  }, [isStepForNamingNewCategory]);

  const categoryLabelData = {
    name: "카테고리 수정: ",
  };

  const moveUpSelectedCategoryButtonData = {
    name: "up",
    onClick: handleClickMoveUpSelectedCategoryButton,
    className: "settingButtons__button",
  };

  const moveDownSelectedCategoryButtonData = {
    name: "down",
    onClick: handleClickMoveDownSelectedCategoryButton,
    className: "settingButtons__button",
  };

  const createNewCategoryButtonData = {
    name: "+",
    onClick: handleClickCreateNewCategoryButton,
    disabled: isDisabled.createNewCategoryButton,
    className: "settingButtons__button",
  };

  const deleteSelectedCategoryButtonData = {
    name: "-",
    onClick: handleClickDeleteSelectedCategoryButton,
    className: "settingButtons__button",
  };

  const setSelectedCategoryAsRepresentativeButtonData = {
    name: "대표로 설정",
    onClick: handleClickSelectedCategoryAsRepresentativeButton,
    className: "settingButtons__button",
  };

  const categorySubmitButtonData = {
    name: "확인",
    onClick: handleClickCategorySubmitButton,
    className: "settingButtons__button",
  };

  const newCategoryTextInputData = {
    value: newCategoryTextInputValue,
    onChange: handleChangeNewCategoryTextInput,
  };

  const completeCreatingNewCategoryButtonData = {
    name: "확인",
    onClick: handleClickCompleteCreatingNewCategoryButton,
  };

  const cancelCreatingNewCategoryButtonData = {
    name: "취소",
    onClick: handleClickCancelCreatingNewCategoryButton,
  };

  const changeSelectedCategoryNameButtonData = {
    name: "이름 변경",
    onClick: handleClickChangeSelectedCategoryNameButton,
  };

  // 카테고리의 이름을 변경하면?
  // 해당 카테고리에 속해 있던 포스트들의 카테고리를 변경해줘야 함.
  // 근데 카테고리의 이름이 변경되었다는 건,, 어떻게 알려줘야 할까?
  // 카테고리 변경이 있을 때마다 매번 서버가 확인 작업을 수행해야 하나?
  // 수정된 카테고리 데이터 외에 추가됐다는 데이터를 하나 더 보내서?
  // 아니면 매번 확인 작업을 하는 로직을 추가해줘야 할까?
  // 그것도 아니면.. 이전 카테고리를 저장해놓고 id와 카테고리 이름의 일치 여부를 판단해서
  // 서버에 전송하는 데이터에 살짝 실어주면 될까?
  // 이 작업을 클라이언트에서 해주는 게 맞나?
  // {prevCategoryNameChange: true,} 이 정도로 보내주면 될까?
  // 굳이 id~카테고리 이름 일치 여부를 두 번이나 확인할 필요 있나?
  // 서버에서 어차피 그에 관한 작업이 필요한 거면.. 서버에서 처리하는 게 맞을 것 같다.
  // 지금 span으로 되어 있는 걸 input으로 바꿔줘야 해.

  const editingSelectedCategoryNameTextInputData = {
    value: editedCategoryName,
    onChange: handleChangeEditingSelectedCategoryNameTextInput,
  };

  const compeleteEditingSelectedCategoryNameButtonData = {
    name: "확인",
    onClick: handleClickCompeleteEditingSelectedCategoryNameButton,
  };

  const cancelEditingSelectedCategoryNameButtonData = {
    name: "취소",
    onClick: handleClickCancelEditingSelectedCategoryNameButton,
  };

  const categoryList = godCategoryData.map(
    ({ id, name, postCount, isRepresentative = false }, index) => {
      const isSelected = index === selectedCategoryIndex;
      const isEditing = index === selectedCategoryIndex && editMode;

      if (isRepresentative === true) {
        return (
          <>
            {isEditing ? (
              <div style={{ display: "flex", gap: "3px" }}>
                <InputText1 data={editingSelectedCategoryNameTextInputData} />
                <Button1
                  data={compeleteEditingSelectedCategoryNameButtonData}
                />
                <Button1 data={cancelEditingSelectedCategoryNameButtonData} />
              </div>
            ) : (
              <span
                key={index}
                className={`categoryList__item ${
                  isSelected ? "categoryList__item--selected" : ""
                }`}
                onClick={() => {
                  setSelectedCategoryIndex(index);
                  setEditMode((prev) => false);
                }}
              >{`${name}(${postCount})(대표)`}</span>
            )}
          </>
        );
      }

      return (
        <>
          {isEditing ? (
            <div style={{ display: "flex", gap: "3px" }}>
              <InputText1 data={editingSelectedCategoryNameTextInputData} />
              <Button1 data={compeleteEditingSelectedCategoryNameButtonData} />
              <Button1 data={cancelEditingSelectedCategoryNameButtonData} />
            </div>
          ) : (
            <span
              key={index}
              className={`categoryList__item ${
                isSelected ? "categoryList__item--selected" : ""
              }`}
              onClick={() => {
                setSelectedCategoryIndex(index);
                setEditMode((prev) => false);
              }}
            >{`${name}(${postCount})`}</span>
          )}
        </>
      );
    }
  );

  return (
    <>
      <div className="categoryEditor">
        <div className="categoryEditor__title">
          <Label1 data={categoryLabelData} />
        </div>
        <div className="categoryEditor__settingButtons">
          <div className="settingButtons">
            <Button1 data={moveUpSelectedCategoryButtonData} />
            <Button1 data={moveDownSelectedCategoryButtonData} />
            <Button1 data={createNewCategoryButtonData} />
            <Button1 data={deleteSelectedCategoryButtonData} />
            <Button1 data={setSelectedCategoryAsRepresentativeButtonData} />
            <Button1 data={changeSelectedCategoryNameButtonData} />
          </div>
        </div>
        <div className="categoryEditor__categoryList">
          <div className="categoryList">{categoryList}</div>
        </div>
        {isStepForNamingNewCategory ? (
          <div className="categoryEditor__newCategoryCreator">
            <div className="newCategoryCreator">
              <InputText1
                data={newCategoryTextInputData}
                ref={newCategoryTextInputRef}
              />
              <Button1 data={completeCreatingNewCategoryButtonData} />
              <Button1 data={cancelCreatingNewCategoryButtonData} />
            </div>
          </div>
        ) : null}

        <div className="categoryEditor__submitButton">
          <Button1 data={categorySubmitButtonData} />
        </div>
      </div>
    </>
  );
}
