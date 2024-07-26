// // COOKIES, LOCAL STORAGE

// export const setAuthUser = (data, access_token) => {
//   // save object to the local storage
//   // Stringify OBJECT TO TEXT
//   localStorage.setItem("user", JSON.stringify(data));
//   localStorage.setItem("access_token", JSON.stringify(access_token));
// };

// export const getAuthUser = (data) => {
//   if (localStorage.getItem("user")) {
//     return JSON.parse(localStorage.getItem("user"));
//   }
// };

// export const removeAuthUser = () => {
//   if (localStorage.getItem("user")) localStorage.removeItem("user");
// };

// Storage.js

export const setAuthUser = (userData, accessToken) => {
  localStorage.setItem("user_data", JSON.stringify(userData));
  localStorage.setItem("access_token", accessToken);
};

export const getAuthUser = () => {
  const userData = localStorage.getItem("user_data");
  const accessToken = localStorage.getItem("access_token");

  return {
    userData: userData ? JSON.parse(userData) : null,
    accessToken,
  };
};

export const logout = () => {
  localStorage.removeItem("user_data");
  localStorage.removeItem("access_token");

};

export const current_theme = localStorage.getItem("current_theme");
