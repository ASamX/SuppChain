import "./Register.css";
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
    primaryColor: "#0F3460"
  },
  {
    background: "#461220",
    color: "#ffffffad",
    primaryColor: "#E94560"
  },
  {
    background: "#192A51",
    color: "#FFFFFF",
    primaryColor: "#967AA1"
  },
  {
    background: "#F7B267",
    color: "#000000",
    primaryColor: "#F4845F"
  },
  {
    background: "#F25F5C",
    color: "#000000",
    primaryColor: "#642B36"
  },
  {
    background: "#231F20",
    color: "#FFF",
    primaryColor: "#BB4430"
  }
];

// Function to apply the selected theme
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

const Register = () => {
  const navigate = useNavigate();

  // State for registration form
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  // Function to handle registration submission
  const registerFun = async (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });

    // Validate if passwords match
    if (register.password !== register.confirmPassword) {
      setRegister({
        ...register,
        loading: false,
        err: ["Password doesn't match"],
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name: register.name,
          email: register.email,
          password: register.password,
          confirmPassword: register.confirmPassword,
        }
      );

      setRegister({ ...register, loading: false, err: [] });

      // Navigate to login page after successful registration
      navigate("/Login");
      console.log(response);
    } catch (error) {
      setRegister({
        ...register,
        loading: false,
        err: error.response?.data?.errors || ["Registration failed"],
      });
    }
  };

  return (
    <section className="register-main-container">
      <div className="register-container">
        {/* Display registration error messages */}
        <div className="circle circle-one"></div>
        <div className="circle circle-two"></div>
        <div className="form-container">
          {/* Illustration */}
          <img src={login_img} alt="illustration" className="illustration" />
          <h1 className="opacity">Register</h1>
          {/* Registration form */}
          <form className="form-register" onSubmit={registerFun}>
            <input type="text" placeholder="Name" required value={register.name}
              onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="email" placeholder="Email" required value={register.email}
              onChange={(e) => setRegister({ ...register, email: e.target.value })} />
            <input type="password" placeholder="Password" required value={register.password}
              onChange={(e) => setRegister({ ...register, password: e.target.value })} />
            <input type="password" placeholder="Confirm Password" required value={register.confirmPassword}
              onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })} />
                   {register.err.map((error, index) => (
          <Alert key={index} variant="danger" className="pass-alert p-2">
            {error}
          </Alert>
        ))}
            <button className="opacity">SUBMIT</button>
          </form>
          {/* Link to navigate to login page */}
          <div className="register-forget opacity">
            <Link onClick={() => navigate("/Login")} >Login</Link>
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

export default Register;
