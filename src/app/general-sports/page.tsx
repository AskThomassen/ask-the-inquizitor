"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface generalSports {
  question: string[];
  answer: string;
}

export default function States() {
  const [states, setstates] = useState<generalSports[]>([]);

  useEffect(() => {
    import("./general.json")
      .then((data) => {
        const shuffledstates = shuffleArray(data.default);
        setstates(shuffledstates);
      })
      .catch((error) => console.error("Error loading states:", error));
  }, []);

  const shuffleArray = (array: generalSports[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {states.length > 0 && (
        <Quiz
          data={states}
          questionTitle="State:"
          inputPlaceholder="Enter state capitol name"
          quizTitle="Capitol of each state quiz:"
        />
      )}
    </Layout>
  );
}
