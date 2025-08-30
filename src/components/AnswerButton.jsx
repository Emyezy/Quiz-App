import React from "react";

const AnswerButton = ({ text, isCorrect, onClick }) => {
  return (
    <button
      className="answer-btn"
      onClick={() => onClick(isCorrect)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AnswerButton;
