import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Notepad from "./components/Notepad";
import SignUp from "./components/SignUp";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* 최상단 제목 */}
      <div className="project-title">
        <h1>Spinai Notepad</h1>
      </div>

      {/* 라우팅 영역 */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* 로그인 페이지 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notepad" element={<Notepad />} /> {/* 메모장 페이지 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
