"use client";
import { useEffect, useState } from "react";
import Quiz from "../../components/quiz";
import Layout from "../../components/layout";

interface name {
  question: string[];
  answer: string;
}

export default function names() {
  const [names, setnames] = useState<name[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<name[]>([]);

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

  const handleQuestionUsed = (question: name) => {
    setUsedQuestions((prev) => [...prev, question]);
  };

  return (
    <Layout>
      {names.length > 0 && (
        <Quiz
          data={names.filter((s) => !usedQuestions.includes(s))}
          questionTitle="NFL team:"
          inputPlaceholder="Enter team name"
          quizTitle="NFL city-name Quiz"
          onQuestionAnswered={handleQuestionUsed}
        />
      )}
    </Layout>
  );
} 
