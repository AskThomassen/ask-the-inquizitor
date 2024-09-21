"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface Cocktail {
  question: string[];
  answer: string;
}

export default function Cocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Cocktail[]>([]);

  useEffect(() => {
    import("./cocktails.json")
      .then((data) => {
        const shuffledCocktails = shuffleArray(data.default);
        setCocktails(shuffledCocktails);
      })
      .catch((error) => console.error("Error loading cocktails:", error));
  }, []);

  const shuffleArray = (array: Cocktail[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleQuestionUsed = (question: Cocktail) => {
    setUsedQuestions((prev) => [...prev, question]);
  };

  return (
    <Layout>
      {cocktails.length > 0 && (
        <Quiz
          data={cocktails.filter((c) => !usedQuestions.includes(c))}
          questionTitle="Ingredients:"
          inputPlaceholder="Enter cocktail name"
          quizTitle="Cocktail Quiz"
        />
      )}
    </Layout>
  );
}
