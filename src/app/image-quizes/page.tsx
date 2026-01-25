"use client";  

import { useRouter } from "next/navigation";
import Layout from "../components/layout";

export default function Landing(): JSX.Element {
  const router = useRouter();

  const handleCategoryClick = (category: string): void => {
    router.push(`/${category}`);
  };

  return (
    <Layout>
      <div className="glass-card-strong p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white text-glow mb-6">
          Welcome to the Picture Quiz!
        </h1>
        <p className="text-lg text-gray-200 mb-4">
          Here, you can practice your quiz knowledge in a variety of image quiz combinations.
        </p>
        <p className="text-sm text-gray-300 mb-6">
          Choose a category to test your knowledge:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            className="glass-btn glass-btn-green py-3 px-4"
            onClick={() => handleCategoryClick("image-quizes/football")}
          >
            ⚽ Football
          </button>
          <button
            className="glass-btn glass-btn-orange py-3 px-4"
            onClick={() => handleCategoryClick("image-quizes/american-sports")}
          >
            🏈 American Sports
          </button>
        </div>
      </div>
    </Layout>
  );
}
