"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface game {
  question: string[];
  answer: string;
}

export default function games() {
  const [games, setgames] = useState<game[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<game[]>([]);

  useEffect(() => {
    import("./game.json")
      .then((data) => {
        const shuffledgames = shuffleArray(data.default);
        setgames(shuffledgames);
      })
      .catch((error) => console.error("Error loading games:", error));
  }, []);

  const shuffleArray = (array: game[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleQuestionUsed = (question: game) => {
    setUsedQuestions((prev) => [...prev, question]);
  };

  return (
    <Layout>
      {games.length > 0 && (
        <Quiz
          data={games.filter((s) => !usedQuestions.includes(s))}
          questionTitle="game:"
          inputPlaceholder="Enter football team"
          quizTitle="Football game Quiz"
          onQuestionAnswered={handleQuestionUsed}
        />
      )}
    </Layout>
  );
}
