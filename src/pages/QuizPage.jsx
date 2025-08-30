import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const QuizPage = ({ questions, setScore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      navigate("/results");
    }
  };

  if (questions.length === 0)
    return <p className="loading">Loading questions...</p>;

  return (
    <div className="quiz-container">
      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <QuestionCard
        question={questions[currentIndex].question}
        answers={questions[currentIndex].answers}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default QuizPage;
