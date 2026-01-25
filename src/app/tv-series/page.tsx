"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface SeriesData {
  question: string[];
  answer: string;
}

export default function TVSeriesQuiz() {
  const [series, setSeries] = useState<SeriesData[]>([]);

  useEffect(() => {
    import("./series.json")
      .then((data) => {
        const shuffledSeries = shuffleArray(data.default);
        setSeries(shuffledSeries);
      })
      .catch((error) => console.error("Error loading series:", error));
  }, []);

  const shuffleArray = (array: SeriesData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {series.length > 0 && (
        <Quiz
          data={series}
          questionTitle="Protagonist(s):"
          inputPlaceholder="Enter TV-show name"
          quizTitle="TV-shows"
        />
      )}
    </Layout>
  );
}
