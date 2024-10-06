"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface QuizData {
  image: string; // Base name of the image
  answers: string[]; // Both team and stadium names as valid answers
}

interface QuizProps {
  data: QuizData[];
  imageFolder: string; // Path to the images folder
  inputPlaceholder: string;
  quizTitle: string;
}

export default function PictureQuiz({
  data,
  imageFolder, // Added image folder prop
  inputPlaceholder,
  quizTitle,
}: QuizProps) {
  const [questions, setQuestions] = useState<QuizData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
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

  const getImageUrl = (imageName: string) => {
    const imageUrl = `/images/football_stadiums/${imageName}`; // Ensure it starts with '/'
    return imageUrl;
  };
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswers = questions[currentQuestionIndex]?.answers.map((answer) =>
      answer.toLowerCase()
    );

    if (correctAnswers.includes(userAnswer)) {
      setScore(score + 1);
      setFeedback("Correct!");
      setUserInput("");
    } else {
      setFeedback("Wrong!");
      setWrongAnswers([...wrongAnswers, questions[currentQuestionIndex]]);
      setUserInput("");
    }
  };

  const handleNextQuestion = () => {
    setFeedback("");
    setUserInput("");

    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const resetQuiz = () => {
    setQuizComplete(false);
    setScore(0);
    setWrongAnswers([]);
    setCurrentQuestionIndex(0);
  };

  if (quizComplete) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Quiz Complete!</h1>
        <p className="text-lg mb-4 text-black">
          Your Score: {score}/{questions.length}
        </p>

        {wrongAnswers.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl text-black font-bold mb-4">
              Review of Incorrect Answers:
            </h2>
            {wrongAnswers.map((question, index) => (
              <div key={index} className="mb-4">
                <img
                  src={getImageUrl(question.image)}
                  alt="Incorrect question"
                  className="w-40 h-40 object-cover mx-auto"
                />
                <p className="text-red-600">
                  Correct Answers: {question.answers.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={resetQuiz}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-6"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <div>Loading...</div>;

  const currentImageUrl = getImageUrl(questions[currentQuestionIndex]?.image);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{quizTitle}</h1>
      
      <img
        src={currentImageUrl}
        alt="Quiz question"
        className="w-64 h-64 object-cover mx-auto mb-6"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          placeholder={inputPlaceholder}
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

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback === "Correct!" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}

      {feedback === "Correct!" || feedback === "Wrong!" ? (
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Next Question
          </button>
        </div>
      ) : null}

      <p className="mt-2 text-gray-700 text-lg">Score: {score}</p>
    </div>
  );
}
