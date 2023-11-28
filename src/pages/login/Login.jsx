import "./Login.scss";
import { useRef, useState } from "react";
import api from "../../lib/axios/axios";
import { useNavigate } from "react-router-dom";

export default function Login({ isGod, setIsGod }) {
  const [loginFormData, setLoginFormData] = useState({ id: "", password: "" });
  console.log(loginFormData);
  const navigate = useNavigate();

  // event handler
  const handleChangeIdInput = (e) => {
    const idInputvalue = e.target.value;

    setLoginFormData((prev) => ({ ...prev, id: idInputvalue }));
  };

  const handleChangePasswordInput = (e) => {
    const passwordInputValue = e.target.value;

    setLoginFormData((prev) => ({ ...prev, password: passwordInputValue }));
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login/test", loginFormData);
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const result = data.result;

        setIsGod((prev) => true);

        return navigate("/");
      } else {
        return console.log(status);
      }
    } catch (error) {
      if (error.response) {
        const response = error.response;
        const status = response.status;
        const data = response.data;

        const result = data.result;

        if (response && status === 401) {
          return alert(result);
        }

        if (response && status === 500) {
          return alert(result);
        }
      } else {
        return console.error(error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__loginBox">
        <form className="loginBox" onSubmit={handleSubmitLoginForm}>
          <div className="loginBox__idAndPasswordInputWrapper">
            <div className="loginBox__idWrapper">
              <label className="label loginBox__idLabel" htmlFor="">
                아이디:
              </label>
              <input
                className="textInput loginBox__idInput"
                onChange={handleChangeIdInput}
                type="text"
                name="id"
                autoComplete="off"
              />
            </div>
            <div className="loginBox__passwordWrapper">
              <label className="label loginBox__passwordLabel" htmlFor="">
                비밀번호:
              </label>
              <input
                className="textInput loginBox__passwordInput"
                onChange={handleChangePasswordInput}
                type="password"
                name="password"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="loginBox__submitButtonWrapper">
            <input
              className="button loginBox__submitButton"
              type="submit"
              value="로그인"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
