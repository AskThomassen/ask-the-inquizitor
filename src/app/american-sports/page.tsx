// pages/Landing.tsx
"use client";  // Ensure this is at the top

import { useRouter } from "next/navigation";
import Layout from "../components/layout";

export default function Landing(): JSX.Element {
  const router = useRouter();

  // Redirect to the selected quiz category
  const handleCategoryClick = (category: string): void => {
    router.push(`/american-sports/${category}`);
  };

  return (
    <Layout>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the American Sports quiz!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          On this page you can choose between a variety of different american sports and practice their Name-City combinations.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Choose a category to test your knowledge:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleCategoryClick("nfl")}
          >
            NFL
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            onClick={() => handleCategoryClick("icehockey")}
          >
            NHL
          </button>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            onClick={() => handleCategoryClick("basketball")}
          >
            NBA
          </button>
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            onClick={() => handleCategoryClick("baseball")}
          >
            MLB
          </button>
        </div>
      </div>
    </Layout>
  );
}
