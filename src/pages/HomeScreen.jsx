import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Quiz App</h1>
      <p className="subtitle">Test your knowledge with 100 fun questions!</p>
      <button className="start-btn" onClick={() => navigate("/quiz")}>
        Start Quiz
      </button>
    </div>
  );
};

export default HomeScreen;
