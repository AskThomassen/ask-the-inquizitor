"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface QuizData {
  question: string[];
  answer: string;
}

interface QuizProps {
  data: {
    question: string[];
    answer: string;
  }[];
  questionTitle: string;
  inputPlaceholder: string;
  quizTitle: string;
}

export default function Quiz({
  data,
  questionTitle,
  inputPlaceholder,
  quizTitle,
}: QuizProps) {
  const [questions, setQuestions] = useState<QuizData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [reversed, setReversed] = useState<boolean>(false);
  const [guessedItems, setGuessedItems] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<QuizData[]>([]);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(data);
    setQuestions(shuffledQuestions);
  }, [data]);

  const shuffleArray = (array: QuizData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reversed) {
      const userGuess = userInput.trim().toLowerCase();
      const correctList = questions[currentQuestionIndex]?.question.map((item) =>
        item.toLowerCase()
      );

      if (correctList?.includes(userGuess) && !guessedItems.includes(userGuess)) {
        setGuessedItems([...guessedItems, userGuess]);
        setScore(score + 1);
        setFeedback("Correct!");
      } else if (guessedItems.includes(userGuess)) {
        setFeedback("Already guessed!");
      } else {
        setFeedback("Wrong!");
      }

      if (guessedItems.length + 1 < correctList?.length) {
        setUserInput("");
      }
    } else {
      if (
        userInput.trim().toLowerCase() ===
        questions[currentQuestionIndex]?.answer.toLowerCase()
      ) {
        setScore(score + 1);
        setFeedback("Correct!");
        setUserInput("");
      } else {
        setFeedback("Wrong!");
        setWrongAnswers([...wrongAnswers, questions[currentQuestionIndex]]);
        setUserInput("");
      }
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setFeedback("");
    setUserInput("");
    setGuessedItems([]);

    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const toggleMode = () => {
    setReversed(!reversed);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setUserInput("");
    setShowAnswer(false);
    setGuessedItems([]);
  };

  const allItemsGuessed =
    guessedItems.length === (questions[currentQuestionIndex]?.question.length || 0);

  const resetQuiz = () => {
    setQuizComplete(false);
    setScore(0);
    setWrongAnswers([]);
    setCurrentQuestionIndex(0);
  };

  if (quizComplete) {
    return (
      <div className="glass-card-strong p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white text-glow mb-6">
          Quiz Complete!
        </h1>
        <p className="text-lg mb-4 text-gray-200">Your Score: {score}/{questions.length}</p>

        {wrongAnswers.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl text-white font-bold mb-4">Review of Incorrect Answers:</h2>
            {wrongAnswers.map((question, index) => (
              <div key={index} className="mb-4 glass-card p-4">
                <p className="font-semibold text-gray-200">Question: {question.question.join(", ")}</p>
                <p className="text-red-400">Correct Answer: {question.answer}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={resetQuiz}
          className="glass-btn glass-btn-blue py-2 px-6 mt-6"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <div className="text-white text-xl">Loading...</div>;

  return (
    <div className="glass-card-strong p-8 max-w-lg w-full text-center">
      <h1 className="text-4xl font-bold text-white text-glow mb-6">{quizTitle}</h1>
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">
        {reversed ? "Reverse answer:" : questionTitle}
      </h2>

      <ul className="mb-6 space-y-2">
        {reversed ? (
          <li className="text-lg text-gray-300">
            {questions[currentQuestionIndex]?.answer}
          </li>
        ) : (
          questions[currentQuestionIndex]?.question.map((item, index) => (
            <li key={index} className="text-lg text-gray-300">
              {item}
            </li>
          ))
        )}
      </ul>
      {reversed && (
        <p className="mb-4 text-gray-300">
          Guessed: {guessedItems.length}/{questions[currentQuestionIndex]?.question.length || 0}
        </p>
      )}

      {!allItemsGuessed && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            placeholder={reversed ? "Enter reverse answer:" : inputPlaceholder}
            className="w-full p-3 glass-input"
            required
          />
          <button
            type="submit"
            className="w-full glass-btn glass-btn-purple py-3"
          >
            Submit
          </button>
        </form>
      )}

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback === "Correct!"
              ? "text-green-400"
              : feedback === "Wrong!"
              ? "text-red-400"
              : feedback === "Already guessed!"
              ? "text-yellow-400"
              : ""
          }`}
        >
          {feedback}
        </p>
      )}

      {feedback === "Wrong!" && showAnswer == false && (
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={() => setShowAnswer(true)}
            className="glass-btn glass-btn-blue py-2 px-4"
          >
            Reveal Answer
          </button>
        </div>
      )}

      {showAnswer && (
        <div className="mt-4">
          <p className="text-red-400">
            {reversed
              ? `The correct items are: ${questions[currentQuestionIndex]?.question.join(
                  ", "
                )}`
              : `The correct answer is: ${questions[currentQuestionIndex]?.answer}`}
          </p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 glass-btn glass-btn-blue py-2 px-4"
          >
            Next Question
          </button>
        </div>
      )}

      {feedback === "Correct!" && (reversed ? allItemsGuessed : true) && (
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="glass-btn glass-btn-blue py-2 px-4"
          >
            Next Question
          </button>
        </div>
      )}

      <p className="mt-4 text-gray-200 text-lg">Score: {score}</p>
      <button
        onClick={toggleMode}
        className="glass-btn glass-btn-purple py-2 px-4 mt-4"
      >
        {reversed ? "Switch to Normal Mode" : "Switch to Reversed Mode"}
      </button>
    </div>
  );
}
