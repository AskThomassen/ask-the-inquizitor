"use client";
import { useEffect, useState } from "react";
import Quiz from "../../components/quiz";
import Layout from "../../components/layout";

interface name {
  question: string[];
  answer: string;
}

export default function Names() {
  const [names, setnames] = useState<name[]>([]);

  useEffect(() => {
    import("./location.json")
      .then((data) => {
        const shufflednames = shuffleArray(data.default);
        setnames(shufflednames);
      })
      .catch((error) => console.error("Error loading names:", error));
  }, []);

  const shuffleArray = (array: name[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {names.length > 0 && (
        <Quiz
          data={names}
          questionTitle="NHL team:"
          inputPlaceholder="Enter team name"
          quizTitle="NHL city-name Quiz"
        />
      )}
    </Layout>
  );
}
