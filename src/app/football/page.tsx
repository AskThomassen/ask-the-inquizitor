  "use client";
  import { useEffect, useState } from "react";
  import Quiz from "../components/quiz";
  import Layout from "../components/layout";

  interface Stadium {
    question: string[];
    answer: string;
  }

  export default function Stadiums() {
    const [stadiums, setStadiums] = useState<Stadium[]>([]);
    const [usedQuestions, setUsedQuestions] = useState<Stadium[]>([]);

    useEffect(() => {
      import("./stadiums.json")
        .then((data) => {
          const shuffledStadiums = shuffleArray(data.default);
          setStadiums(shuffledStadiums);
        })
        .catch((error) => console.error("Error loading stadiums:", error));
    }, []);

    const shuffleArray = (array: Stadium[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const handleQuestionUsed = (question: Stadium) => {
      setUsedQuestions((prev) => [...prev, question]);
    };

    return (
      <Layout>
        {stadiums.length > 0 && (
          <Quiz
            data={stadiums.filter((s) => !usedQuestions.includes(s))}
            questionTitle="Stadium:"
            inputPlaceholder="Enter football team"
            quizTitle="Football Stadium Quiz"
          />
        )}
      </Layout>
    );
  }
