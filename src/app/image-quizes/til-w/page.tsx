"use client";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import PictureQuiz from "../../components/image_quiz";

interface StadiumQuizData {
  image: string;
  answers: string[];
}

export default function Stadiums() {
  const [stadiums, setStadiums] = useState<StadiumQuizData[]>([]);
  const imagesFolder = "/images/players_til-w";

  useEffect(() => {
    import("./players.json")
      .then((data) => {
        const shuffledStadiums = shuffleArray(data.default);
        setStadiums(shuffledStadiums);
      })
      .catch((error) => console.error("Error loading stadiums:", error));
  }, []);

  const shuffleArray = (array: StadiumQuizData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Layout>
      {stadiums.length > 0 && (
        <PictureQuiz
          data={stadiums}
          imageFolder={imagesFolder}
          inputPlaceholder="Enter name of player"
          quizTitle="Football Player Quiz"
        />
      )}
    </Layout>
  );
}
