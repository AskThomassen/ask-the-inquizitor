"use client";  

import { useRouter } from "next/navigation";
import Layout from "./components/layout";

export default function Landing(): JSX.Element {
  const router = useRouter();

  const handleCategoryClick = (category: string): void => {
    router.push(`/${category}`);
  };

  return (
    <Layout>
      <div className="glass-card-strong p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white text-glow mb-6">
          Welcome to Ask The Inquizitor!
        </h1>
        <p className="text-lg text-gray-200 mb-4">
          Here, you can practice your quiz knowledge in a variety of themes.
        </p>
        <p className="text-sm text-gray-300 mb-6">
          Choose a category to test your knowledge:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            className="glass-btn glass-btn-blue py-3 px-4"
            onClick={() => handleCategoryClick("cocktails")}
          >
            🍹 Cocktails
          </button>
          <button
            className="glass-btn glass-btn-green py-3 px-4"
            onClick={() => handleCategoryClick("football")}
          >
            ⚽ Football
          </button>
          <button
            className="glass-btn glass-btn-purple py-3 px-4"
            onClick={() => handleCategoryClick("video-games")}
          >
            🎮 Video Games
          </button>
          <button
            className="glass-btn glass-btn-orange py-3 px-4"
            onClick={() => handleCategoryClick("american-sports")}
          >
            🏈 American Sports
          </button>
          <button
            className="glass-btn glass-btn-red py-3 px-4"
            onClick={() => handleCategoryClick("tv-series")}
          >
            📺 TV-shows
          </button>
          <button
            className="glass-btn glass-btn-cyan py-3 px-4"
            onClick={() => handleCategoryClick("movies")}
          >
            🎬 Movies
          </button>
          <button
            className="glass-btn glass-btn-yellow py-3 px-4"
            onClick={() => handleCategoryClick("usa")}
          >
            USA
          </button>
          <button
            className="glass-btn glass-btn-pink py-3 px-4"
            onClick={() => handleCategoryClick("general-sports")}
          >
            🏆 General Sports
          </button>
          <button
            className="glass-btn glass-btn-teal py-3 px-4"
            onClick={() => handleCategoryClick("image-quizes")}
          >
            🖼️ Image Quizes
          </button>
        </div>
      </div>
    </Layout>
  );
}
