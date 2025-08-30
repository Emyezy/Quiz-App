import React from "react";
import AnswerButton from "./AnswerButton";

const QuestionCard = ({ question, answers, onAnswer }) => {
  return (
    <div className="question-card">
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((ans, index) => (
          <AnswerButton
            key={index}
            text={ans.text}
            isCorrect={ans.correct}
            onClick={onAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
