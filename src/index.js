import React from "react"; //리액트 라이브러리
import ReactDOM from "react-dom/client"; // 웹브라우저랑 상호작용하는 react의 라이브러리
import "./index.css"; // 컴포넌트 스타일
import App from "./App"; // App.js에서 만든 컴포넌트
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
