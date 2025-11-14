import React, { useEffect } from "react";

interface IntroPageProps {
  onStart: () => void;
  lastScore: number;
  highestScore: number;
}

const IntroPage: React.FC<IntroPageProps> = ({
  onStart,
  lastScore,
  highestScore,
}) => {
  // Handle spacebar to start game
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onStart]);

  const handleBuyMeACoffee = () => {
    window.open("https://www.buymeacoffee.com/yourusername", "_blank");
  };

  const handleReportBug = () => {
    window.open("https://forms.gle/zBR26NHAxN2wCeA59", "_blank");
  };

  const handleSuggest = () => {
    window.open("https://forms.gle/aRuHKxo9gqqXcWL96", "_blank");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Frosted glass panel */}
      <div className="relative z-10 w-[92%] max-w-2xl mx-auto p-6 md:p-10 rounded-3xl bg-white/6 border border-white/10 backdrop-blur-lg shadow-2xl">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3">
            
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Flappy Bird
            </h1>
          </div>

          {/* Score cards */}
          <div className="flex gap-4 flex-wrap justify-center w-full">
            <div className="min-w-[120px] px-4 py-3 rounded-xl bg-white/8 border border-white/8 backdrop-blur-sm text-center">
              <p className="text-xs text-white/80 uppercase">Last Score</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {lastScore}
              </p>
            </div>
            <div className="min-w-[120px] px-4 py-3 rounded-xl bg-white/8 border border-white/8 backdrop-blur-sm text-center">
              <p className="text-xs text-white/80 uppercase">Best</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {highestScore}
              </p>
            </div>
          </div>

          {/* Primary action */}
          <button
            onClick={onStart}
            className="mt-2 w-full md:w-auto px-6 py-3 rounded-xl bg-white/10 border border-white/12 text-white font-semibold hover:bg-white/14 transition"
          >
            Start Game
          </button>

          {/* Small action links */}
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <button
              onClick={handleBuyMeACoffee}
              className="text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 transition"
            >
              Buy Me a Coffee
            </button>
            <button
              onClick={handleReportBug}
              className="text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 transition"
            >
              Report Bug
            </button>
            <button
              onClick={handleSuggest}
              className="text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 transition"
            >
              Suggest
            </button>
          </div>

          {/* Controls */}
          <div className="mt-4 text-sm text-white/70 w-full">
            <div className="mx-auto max-w-[420px] bg-white/3 p-3 rounded-lg text-center">
              <p className="font-medium">Controls</p>
              <p className="mt-1">
                Press{" "}
                <kbd className="bg-black/70 text-white px-2 py-1 rounded">
                  SPACE
                </kbd>{" "}
                or click/tap to jump
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
