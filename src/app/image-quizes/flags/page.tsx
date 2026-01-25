"use client";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import PictureQuiz from "../../components/image_quiz";

interface FlagQuizData {
  image: string;
  answers: string[];
}

export default function FlagsQuiz() {
  const [flags, setFlags] = useState<FlagQuizData[]>([]);
  const imagesFolder = "/images/country-flags";

  useEffect(() => {
    import("./flags_quiz.json")
      .then((data) => {
        const shuffledFlags = shuffleArray(data.default);
        setFlags(shuffledFlags);
      })
      .catch((error) => console.error("Error loading flags:", error));
  }, []);

  const shuffleArray = (array: FlagQuizData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {flags.length > 0 && (
        <PictureQuiz
          data={flags}
          imageFolder={imagesFolder}
          inputPlaceholder="Enter name of the country which has this flag:"
          quizTitle="Flag-Country Quiz"
        />
      )}
    </Layout>
  );
}
