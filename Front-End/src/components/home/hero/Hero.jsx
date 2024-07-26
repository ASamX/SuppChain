  import React, { useEffect } from "react";
  import Heading from "../../common/Heading";
  import "./hero.css";
  import Logo from "./Logo.png"; // Assuming the logo image is in the same directory as this component and named "Logo.png"
  import { useNavigate } from "react-router-dom";
  import { getAuthUser } from "../../../helper/Storage";
  const { userData } = getAuthUser(); // Get user data from local storage
  const isGuest = userData && userData.user.role === 0; // Check if the user is an admin
  const isAdmin = userData && userData.user.role === 1; // Check if the user is an admin
  const isFactoryAdmin = userData && userData.user.role === 2; // Check if the user is a factory admin
  const isShopAdmin = userData && userData.user.role === 3; // Check if the user is a shop admin

  const Hero = () => {
    // Define the navigate function outside of useEffect
    const navigate = useNavigate();

    useEffect(() => {
      const title = document.querySelector(".hero h1");
      const subtitle = document.querySelector(".hero p");
      const textArray = ["Find new & featured products", "Everything from A to Z", "All here in SuppChain"];
      const quotationMark = '""';
      const verticalLine = "|";
      let wordIndex = 0;
      let textIndex = 0;
      let isDeleting = false;

      const typeEffect = () => {
        const currentText = textArray[textIndex];
        if (!isDeleting) {
          title.textContent = currentText.substring(0, wordIndex + 1) + verticalLine;
          wordIndex++;
        } else {
          title.textContent = currentText.substring(0, wordIndex - 1) + verticalLine;
          wordIndex--;
        }

        if (isDeleting && wordIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % textArray.length;
        } else if (!isDeleting && wordIndex === currentText.length) {
          isDeleting = true;
        }

        const typingSpeed = isDeleting ? 50 : 200;
        setTimeout(typeEffect, typingSpeed);
      };

      // Move the setTimeout for typeEffect outside of useEffect
      setTimeout(typeEffect, 200);
    }, []); // Make sure to include all dependencies in the dependency array if necessary

    // Define the click handler for the button
    const handleGetStartedClick = () => {
      if (isAdmin) {
        navigate("/home");
      } else if (isFactoryAdmin) {
        // User is a factory admin, redirect to schedule page
        navigate("/Schedules");
      } else if (isShopAdmin) {
        // User is a shop admin, redirect to shop admin warehouses page
        navigate("/ShopAdminWarehouses");
      } else if (isGuest) {
        // User is not logged in, redirect to login page
        navigate("/MyAccount");
      }
      else if (!userData) {
        // User is not logged in, redirect to login page
        navigate("/Login");
      }
    };
    return (
      <>
        <section className='hero'>
          <div className='hero-container container'>
            <div className="logoContainer">
              <img src={Logo} alt="SuppChain Logo" className="logo" />
              <h2>SuppChain</h2>
            </div>
            <Heading title='Every thing form A to Z' subtitle='Find new & featured Product and every thing here in SuppChain.' />
            <button onClick={handleGetStartedClick} className="getstarted btn1">Get Started</button>
          </div>
        </section>
      </>
    );
  };

  export default Hero;
