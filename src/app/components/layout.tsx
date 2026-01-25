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
    <div className="min-h-screen liquid-bg flex flex-col relative">
      {/* Floating orbs for ambient effect */}
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* Glass header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-center">
          <button
            onClick={handleHomeClick}
            className="text-2xl font-bold text-white text-glow hover:text-glow-purple focus:outline-none transition-all duration-300"
          >
            ✨ Ask The Inquizitor ✨
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center relative z-10 p-4">
        {children}
      </main>
    </div>
  );
}
