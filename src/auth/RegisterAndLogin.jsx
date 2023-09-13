import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from './../main';
import { Card, Space } from "antd";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { database } from '../firebaseConfig'

const RegisterAndLogin = () => {
  const [login, setLogin] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const history = useNavigate();

  let authStore = useAuth();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      // gọi hàm firebase tạo user đăng kí
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          // auth.signin()
          history("/data");
          alert('đăng nhập thành công!');
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      // gọi hàm signin đăng nhập
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          authStore.signin(data.user.email, navigate("/", { replace: true }));
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  }

  const handleReset = () => {
    history('/reset');
  }

  return (
    <Space direction="vertical" size={16}>
      <Card extra={<a href="#">More</a>} style={{ width: 300 }}>
        <div className="App">
          {/* Registration and login Screen */}
          <div className="row">
            <div
              className={login == false ? "activeColor" : "pointer"}
              onClick={() => setLogin(false)}
            >
              SignUp
            </div>
            <div
              className={login == true ? "activeColor" : "pointer"}
              onClick={() => setLogin(true)}
            >
              SignIn
            </div>
          </div>
          <h1>{login ? "SignIn" : "SignUp"}</h1>
          <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
            <input name="email" placeholder="Email" />
            <br />
            <input name="password" type="text" placeholder="Password" />
            <br />
            <p onClick={handleReset}>Forgot Password?</p>
            <br />
            <button>{login ? "SignIn" : "SignUp"}</button>
          </form>
        </div>
      </Card>
    </Space>
  )
}

export default RegisterAndLogin;