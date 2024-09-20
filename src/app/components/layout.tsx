"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-center">
          <button
            onClick={handleHomeClick}
            className="text-2xl font-bold text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            Ask The Inquizitor
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
