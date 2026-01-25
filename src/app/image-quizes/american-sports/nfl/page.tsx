"use client";
import { useEffect, useState } from "react";
import Quiz from "../../../components/quiz";
import Layout from "../../../components/layout";

interface TeamData {
  question: string[];
  answer: string;
}

export default function NFLQuiz() {
  const [teams, setTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    import("./location.json")
      .then((data) => {
        const shuffledTeams = shuffleArray(data.default);
        setTeams(shuffledTeams);
      })
      .catch((error) => console.error("Error loading teams:", error));
  }, []);

  const shuffleArray = (array: TeamData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {teams.length > 0 && (
        <Quiz
          data={teams}
          questionTitle="NFL team:"
          inputPlaceholder="Enter team name"
          quizTitle="NFL city-name Quiz"
        />
      )}
    </Layout>
  );
} 
