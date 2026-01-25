"use client";
import { useEffect, useState } from "react";
import Quiz from "../../components/image_quiz";
import Layout from "../../components/layout";
import PictureQuiz from "../../components/image_quiz";

interface Stadium {
  question: string[];
  answer: string;
}

export default function Stadiums() {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Stadium[]>([]);
  const imagesFolder = "/images/country-flags";

  useEffect(() => {
    import("./flags_quiz.json")
      .then((data) => {
        const shuffledStadiums = shuffleArray(data.default);
        setStadiums(shuffledStadiums);
      })
      .catch((error) => console.error("Error loading stadiums:", error));
  }, []);

  const shuffleArray = (array: Stadium[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleQuestionUsed = (question: Stadium) => {
    setUsedQuestions((prev) => [...prev, question]);
  };

  return (
    <Layout>
      {stadiums.length > 0 && (
        <PictureQuiz
          data={stadiums.filter((s) => !usedQuestions.includes(s))}
          imageFolder={imagesFolder} // Pass the images folder path
          questionTitle="Flags of countries:"
          inputPlaceholder="Enter name of the country which has this flag:"
          quizTitle="Flag-Country quiz"
        />
      )}
    </Layout>
  );
}
