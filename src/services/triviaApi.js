export const fetchTriviaQuestions = async (amount = 90) => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&type=multiple`
    );
    const data = await res.json();

    return data.results.map((q) => {
      const allAnswers = [
        ...q.incorrect_answers.map((ans) => ({ text: ans, correct: false })),
        { text: q.correct_answer, correct: true },
      ];

      // Shuffle answers
      return {
        question: q.question,
        answers: allAnswers.sort(() => Math.random() - 0.5),
      };
    });
  } catch (err) {
    console.error("Error fetching trivia questions:", err);
    return [];
  }
};
