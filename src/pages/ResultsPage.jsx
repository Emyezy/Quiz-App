import React from "react";
import { useNavigate } from "react-router-dom";

const ResultsPage = ({ score, total }) => {
  const navigate = useNavigate();

  return (
    <div className="results-container">
      <h1>Your Results</h1>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
      <button className="restart-btn" onClick={() => navigate("/")}>
        Play Again
      </button>
    </div>
  );
};

export default ResultsPage;
