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
  imageFolder,
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
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

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
    return `${imageFolder}/${imageName}`;
  };

  // Generate all valid answers: each individual name part, each original answer, and the full name
  const getAllValidAnswers = (answers: string[]): string[] => {
    const validAnswers: Set<string> = new Set();
    
    // Add each original answer and split each by spaces
    answers.forEach((answer) => {
      validAnswers.add(answer.toLowerCase());
      // Split by space and add each part
      answer.split(" ").forEach((part) => {
        if (part.trim()) {
          validAnswers.add(part.trim().toLowerCase());
        }
      });
    });
    
    // Add the full name (all answers joined)
    validAnswers.add(answers.join(" ").toLowerCase());
    
    return Array.from(validAnswers);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswers = getAllValidAnswers(questions[currentQuestionIndex]?.answers || []);

    if (correctAnswers.includes(userAnswer)) {
      setScore(score + 1);
      setFeedback("Correct!");
      setUserInput("");
      setShowAnswer(false);
    } else {
      setFeedback("Wrong!");
      setWrongAnswers([...wrongAnswers, questions[currentQuestionIndex]]);
      setUserInput("");
      setShowAnswer(false);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
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
              <div key={index} className="mb-4">
                <img
                  src={getImageUrl(question.image)}
                  alt="Incorrect question"
                  className="w-40 h-40 object-contain mx-auto"
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
  console.log(currentImageUrl);

  return (
    <div className="glass-card-strong p-8 max-w-lg w-full text-center">
      <h1 className="text-4xl font-bold text-white text-glow mb-6">{quizTitle}</h1>
      
      <img
        src={currentImageUrl}
        alt="Quiz question"
        className="w-64 h-64 object-contain mx-auto mb-6"
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

      {feedback === "Wrong!" && !showAnswer && (
        <div className="mt-4">
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
            The correct answers are: {questions[currentQuestionIndex]?.answers.join(", ")}
          </p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Next Question
          </button>
        </div>
      )}

      {feedback === "Correct!" && (
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
    </div>
  );
}
