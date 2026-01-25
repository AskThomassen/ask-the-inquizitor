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
      <div className="glass-card-strong p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white text-glow mb-6">Quiz Complete!</h1>
        <p className="text-lg mb-4 text-gray-200">
          Your Score: {score}/{questions.length}
        </p>

        {wrongAnswers.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl text-white font-bold mb-4">
              Review of Incorrect Answers:
            </h2>
            {wrongAnswers.map((question, index) => (
              <div key={index} className="mb-4 glass-card p-4">
                <img
                  src={getImageUrl(question.image)}
                  alt="Incorrect question"
                  className="w-40 h-40 object-cover mx-auto rounded-lg"
                />
                <p className="text-red-400 mt-2">
                  Correct Answers: {question.answers.join(", ")}
                </p>
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

  const currentImageUrl = getImageUrl(questions[currentQuestionIndex]?.image);

  return (
    <div className="glass-card-strong p-8 max-w-lg w-full text-center">
      <h1 className="text-4xl font-bold text-white text-glow mb-6">{quizTitle}</h1>
      
      <img
        src={currentImageUrl}
        alt="Quiz question"
        className="w-64 h-64 object-cover mx-auto mb-6 rounded-xl border border-white/20 shadow-lg"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          placeholder={inputPlaceholder}
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

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback === "Correct!" ? "text-green-400" : "text-red-400"
          }`}
        >
          {feedback}
        </p>
      )}

      {feedback === "Correct!" || feedback === "Wrong!" ? (
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className="glass-btn glass-btn-blue py-2 px-4"
          >
            Next Question
          </button>
        </div>
      ) : null}

      <p className="mt-4 text-gray-200 text-lg">Score: {score}</p>
    </div>
  );
}
