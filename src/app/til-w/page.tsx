"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface GameData {
  question: string[];
  answer: string;
}

export default function VideoGamesQuiz() {
  const [games, setGames] = useState<GameData[]>([]);

  useEffect(() => {
    import("./players.json")
      .then((data) => {
        const shuffledGames = shuffleArray(data.default);
        setGames(shuffledGames);
      })
      .catch((error) => console.error("Error loading games:", error));
  }, []);

  const shuffleArray = (array: GameData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {games.length > 0 && (
        <Quiz
          data={games}
          questionTitle="Player:"
          inputPlaceholder="Number"
          quizTitle="Player Number Quiz"
        />
      )}
    </Layout>
  );
}
