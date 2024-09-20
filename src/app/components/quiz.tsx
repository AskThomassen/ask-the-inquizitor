"use client";
import { useState, FormEvent, ChangeEvent } from "react";

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
    onQuestionAnswered?: (question: { question: string[]; answer: string }) => void;
  }

export default function Quiz({
  data,
  questionTitle,
  inputPlaceholder,
  quizTitle,
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [reversed, setReversed] = useState<boolean>(false);
  const [guessedItems, setGuessedItems] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reversed) {
      const userGuess = userInput.trim().toLowerCase();

      const correctList = data[currentQuestion].question.map((item) =>
        item.toLowerCase()
      );

      if (correctList.includes(userGuess) && !guessedItems.includes(userGuess)) {
        setGuessedItems([...guessedItems, userGuess]);
        setScore(score + 1);
        setFeedback("Correct!");
      } else if (guessedItems.includes(userGuess)) {
        setFeedback("Already guessed!");
      } else {
        setFeedback("Wrong!");
      }

      if (guessedItems.length + 1 < correctList.length) {
        setUserInput("");
      }
    } else {
      if (
        userInput.trim().toLowerCase() ===
        data[currentQuestion].answer.toLowerCase()
      ) {
        setScore(score + 1);
        setFeedback("Correct!");
        setUserInput(""); 
      } else {
        setFeedback("Wrong!");
        setUserInput(""); 
      }
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setFeedback("");
    setUserInput("");
    setGuessedItems([]);
    setCurrentQuestion((prev) => (prev + 1) % data.length);
  };

  const handleTryAgain = () => {
    setFeedback("");
    setShowAnswer(false);
  };

  const toggleMode = () => {
    setReversed(!reversed);
    setCurrentQuestion(0); 
    setScore(0); 
    setFeedback("");
    setUserInput("");
    setShowAnswer(false);
    setGuessedItems([]);
  };

  const allItemsGuessed = guessedItems.length === data[currentQuestion].question.length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{quizTitle}</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {reversed ? "Reverse answer:" : questionTitle}
      </h2>

      <ul className="mb-6 space-y-2">
        {reversed ? (
          <li className="text-lg text-gray-600">
            {data[currentQuestion].answer}
          </li>
        ) : (
          data[currentQuestion].question.map((item, index) => (
            <li key={index} className="text-lg text-gray-600">
              {item}
            </li>
          ))
        )}
      </ul>
      {reversed && (
        <p className="mb-4 text-gray-600">
          Guessed: {guessedItems.length}/{data[currentQuestion].question.length}
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
            placeholder={
              reversed
                ? "Enter reverse answer:"
                : inputPlaceholder
            }
            className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      )}

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback === "Correct!"
              ? "text-green-600"
              : feedback === "Wrong!"
              ? "text-red-600"
              : feedback === "Already guessed!"
              ? "text-yellow-600"
              : ""
          }`}
        >
          {feedback}
        </p>
      )}

      {feedback === "Wrong!" && showAnswer == false && (
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={handleTryAgain}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Reveal Answer
          </button>
        </div>
      )}

      {showAnswer && (
        <div className="mt-4">
          <p className="text-red-600">
            {reversed
              ? `The correct items are: ${data[currentQuestion].question.join(
                  ", "
                )}`
              : `The correct answer is: ${data[currentQuestion].answer}`}
          </p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Next Question
          </button>
        </div>
      )}

      {feedback === "Correct!" && (reversed ? allItemsGuessed : true) && (
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Next Question
          </button>
        </div>
      )}

      <p className="mt-2 text-gray-700 text-lg">Score: {score}</p>
      <button
        onClick={toggleMode}
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition mb-6"
      >
        {reversed ? "Switch to Normal Mode" : "Switch to Reversed Mode"}
      </button>
    </div>
  );
}
