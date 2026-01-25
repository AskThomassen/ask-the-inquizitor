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
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
                        onClick={() => handleCategoryClick("geography/usa")}
                    >
                        USA
                    </button>
                    <button
                        className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
                        onClick={() => handleCategoryClick("geography/asia")}
                    >
                        Asia
                    </button>
                    <button
                        className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
                        onClick={() => handleCategoryClick("geography/africa")}
                    >
                        Africa
                    </button>
                    <button
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
                        onClick={() => handleCategoryClick("geography/europe")}
                    >
                        Europe
                    </button>
                </div>
            </div>
        </Layout>
    );
}
