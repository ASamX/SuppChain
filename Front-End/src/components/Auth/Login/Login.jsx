import "./Login.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser, getAuthUser } from "../../../helper/Storage";
import { Link, useNavigate } from "react-router-dom";
import login_img from "../../images/illustration.png";

const themes = [
  {
    background: "#1A1A2E",
    color: "#ffffffad",
    primaryColor: "#0F3460",
  },
  {
    background: "#461220",
    color: "#ffffffad",
    primaryColor: "#E94560",
  },
  {
    background: "#192A51",
    color: "#ffffffad",
    primaryColor: "#967AA1",
  },
  {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F4845F",
  },
  {
    background: "#F25F5C",
    color: "#000000",
    primaryColor: "#642B36",
  },
  {
    background: "#231F20",
    color: "#FFF",
    primaryColor: "#BB4430",
  },
];

const setTheme = (theme) => {
  document.documentElement.style.setProperty('--background', theme.background);
  document.documentElement.style.setProperty('--color', theme.color);
  document.documentElement.style.setProperty('--primary-color', theme.primaryColor);

  // Save the selected theme in local storage
  localStorage.setItem('selectedTheme', JSON.stringify(theme));
};

// Function to retrieve the saved theme from local storage
const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('selectedTheme');
  return savedTheme ? JSON.parse(savedTheme) : themes[0];
};

const Login = () => {
  const navigate = useNavigate();

  // State for login form
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  // State for selected theme
  const [selectedTheme, setSelectedTheme] = useState(getSavedTheme());

  // Apply the theme when component mounts
  useEffect(() => {
    setTheme(selectedTheme);
  }, [selectedTheme]);

  // Function to handle theme selection
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  // Function to display theme buttons
  const displayThemeButtons = () => {
    return themes.map((theme, index) => (
      <div
        key={index}
        className="theme-btn"
        style={{ background: theme.background, width: '25px', height: '25px' }}
        onClick={() => handleThemeChange(theme)}
      ></div>
    ));
  };

  // Function to handle login submission
  const LoginFun = async (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          email: login.email,
          password: login.password,
        }
      );

      setLogin({ ...login, loading: false, err: [] });

      // Save user data and access token in local storage
      setAuthUser(response.data, response.data.access_token);
      console.log(response);

      // Navigate to home page after successful login
      navigate("/Home");
    } catch (error) {
      setLogin({
        ...login,
        loading: false,
        err: error.response?.data?.errors || ["Invalid email or password"],
      });
    }
  };

  return (
    <section className="login-main-container">
      <div className="login-container">
        {/* Display login error messages */}
        <div className="circle circle-one"></div>
        <div className="circle circle-two"></div>
        <div className="form-container">
          {/* Illustration */}
          <img src={login_img} alt="illustration" className="illustration" />
          <h1 className="opacity">LOGIN</h1>
          {/* Login form */}
          <form className="form-login" onSubmit={LoginFun}>
            <input type="email" placeholder="Email" required value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            <input type="password" placeholder="Password" required value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            <button className="opacity">SUBMIT</button>
            {login.err.map((error, index) => (
          <Alert key={index} variant="danger" className="pass-alert p-2">
            {error}
          </Alert>
        ))}
          </form>
          {/* Links for registration and forgot password */}
          <div className="login-forget opacity">
            <Link onClick={() => navigate("/Register")} >REGISTER</Link>
            {/* <Link href="">FORGOT PASSWORD</Link> */}
          </div>
        </div>
      </div>
      {/* Display theme selection buttons */}
      <div className="theme-btn-container">
        {displayThemeButtons()}
      </div>
    </section>
  );
};

export default Login;
