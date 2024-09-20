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
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Ask The Inquizitor!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Here, you can practice your quiz knowledge in a variety of themes.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Choose a category to test your knowledge:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleCategoryClick("cocktails")}
          >
            Cocktails
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            onClick={() => handleCategoryClick("football")}
          >
            Football
          </button>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            onClick={() => handleCategoryClick("video-games")}
          >
            Video Games
          </button>
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            onClick={() => handleCategoryClick("american-sports")}
          >
            American Sports
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            onClick={() => handleCategoryClick("tv-series")}
          >
            TV-shows and series
          </button>
          <button
            className="bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition"
            onClick={() => handleCategoryClick("movies")}
          >
            Movies
          </button>
        </div>
      </div>
    </Layout>
  );
}
