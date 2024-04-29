// import React, { Component } from "react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// export const setCookie = (name: string, value: string, type: string) => {
//   const expires = new Date();
//   switch (type) {
//     case "accToken":
//       expires.setHours(expires.getHours() + 1);
//       break;
//     case "refToken":
//       expires.setDate(expires.getDate() + 90);
//       break;
//     case "tuto":
//       expires.setFullYear(expires.getFullYear() + 10);
//       break;
//     case "fcmToken":
//       expires.setDate(expires.getDate() + 90);
//       break;
//     default:
//       break;
//   }

//   return cookies.set(name, value, {
//     path: "/",
//     expires,
//   });
// };

// export const getCookie = (name: string) => {
//   return cookies.get(name);
// };
