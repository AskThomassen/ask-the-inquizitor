// pages/Landing.tsx
"use client";  // Ensure this is at the top

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";

export default function Landing(): JSX.Element {
  const router = useRouter();

  // Redirect to the selected quiz category
  const handleCategoryClick = (category: string): void => {
    router.push(`/image-quizes/american-sports/${category}`);
  };

  return (
    <Layout>
      <div className="glass-card-strong p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-white text-glow mb-6">
          American Sports Image Quiz!
        </h1>
        <p className="text-lg text-gray-200 mb-4">
          On this page you can choose between a variety of different american sports and practice their Name-City combinations.
        </p>
        <p className="text-sm text-gray-300 mb-6">
          Choose a category to test your knowledge:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            className="glass-btn glass-btn-blue py-3 px-4"
            onClick={() => handleCategoryClick("nfl")}
          >
            🏈 NFL
          </button>
          <button
            className="glass-btn glass-btn-green py-3 px-4"
            onClick={() => handleCategoryClick("icehockey")}
          >
            🏒 NHL
          </button>
          <button
            className="glass-btn glass-btn-purple py-3 px-4"
            onClick={() => handleCategoryClick("basketball")}
          >
            🏀 NBA
          </button>
          <button
            className="glass-btn glass-btn-orange py-3 px-4"
            onClick={() => handleCategoryClick("baseball")}
          >
            ⚾ MLB
          </button>
        </div>
      </div>
    </Layout>
  );
}
