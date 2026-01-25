"use client";
import { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import Layout from "../components/layout";

interface MovieData {
  question: string[];
  answer: string;
}

export default function MoviesQuiz() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    import("./movies.json")
      .then((data) => {
        const shuffledMovies = shuffleArray(data.default);
        setMovies(shuffledMovies);
      })
      .catch((error) => console.error("Error loading movies:", error));
  }, []);

  const shuffleArray = (array: MovieData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {movies.length > 0 && (
        <Quiz
          data={movies}
          questionTitle="Protagonist(s):"
          inputPlaceholder="Enter movie name"
          quizTitle="Movie quiz:"
        />
      )}
    </Layout>
  );
}
