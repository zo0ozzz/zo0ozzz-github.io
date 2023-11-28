import "./PostToolBar.scss";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import { POST_API, POST_EDIT_PAGE } from "../../URL";
import Button2 from "../button2/Button2.jsx";

const PostToolBar = ({ _id, setCategoryData, isGod, mode, post }) => {
  const navigate = useNavigate();

  // handler function
  const handleClickCompleteEditButton = async () => {
    try {
      const editedPost = post;
      const response = await api.patch(POST_API(_id), editedPost);
      const status = response.status;
      // const data = response.data;

      if (status === 200) {
        return navigate("/posts/" + _id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancleEditButton = () => navigate(-1);

  const handleClickCompleteCreateButton = async () => {
    try {
      const newPost = post;

      const response = await api.post(POST_API(""), newPost);
      const status = response.status;
      const data = response.data;
      const newPost_id = data._id;

      if (status === 200) {
        navigate("/posts/" + newPost_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancleCreateButton = () => navigate(-1);

  const handleClickEditPostButton = () => navigate(POST_EDIT_PAGE(_id));

  const handleClickDeletePostButton = async () => {
    const answer = prompt("게시물을 삭제하시겠습니까?");

    if (answer === null) {
      return;
    }

    try {
      const response = await api.delete(POST_API(_id));
      const status = response.status;

      if (status === 200) {
        alert("삭제 완료");
        navigate("/");

        return;
      } else {
        console.log(status);

        return;
      }
    } catch (error) {
      alert("삭제 실패(통신 오류)");

      console.log(error);
    }
  };

  const buttons = {
    edit: (
      <>
        <Button2
          name="수정 완료"
          className="postToolBar__completeEditButton"
          onClick={handleClickCompleteEditButton}
        />
        <Button2
          name="취소"
          className="postToolBar__cancleEditButton"
          onClick={handleClickCancleEditButton}
        />
      </>
    ),
    create: (
      <>
        <Button2
          name="등록"
          className="postToolBar__completeCreateButton"
          onClick={handleClickCompleteCreateButton}
        />
        <Button2
          name="취소"
          className="postToolBar__cancleCreateButton"
          onClick={handleClickCancleCreateButton}
        />
      </>
    ),
    view: (
      <>
        <Button2
          name="수정"
          className="postToolBar__editPostButton"
          onClick={handleClickEditPostButton}
        />
        <Button2
          name="삭제"
          className="postToolBar__deletePostButton"
          onClick={handleClickDeletePostButton}
        />
      </>
    ),
  };

  return (
    <div className="postToolBar">
      {isGod ? (
        <div className="postToolBar__buttonsWrapper">{buttons[mode]}</div>
      ) : null}
    </div>
  );
};

export default PostToolBar;
