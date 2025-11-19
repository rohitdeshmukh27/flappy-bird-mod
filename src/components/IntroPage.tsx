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

  const handleBuyMeACoffee = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://www.buymeacoffee.com/yourusername", "_blank");
  };

  const handleReportBug = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://forms.gle/zBR26NHAxN2wCeA59", "_blank");
  };

  const handleSuggest = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://forms.gle/aRuHKxo9gqqXcWL96", "_blank");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Frosted glass panel */}
      <div className="relative z-10 w-[95%] sm:w-[92%] max-w-2xl mx-auto p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white/6 border border-white/10 backdrop-blur-lg shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Flappy Bird
            </h1>
          </div>

          {/* Score cards */}
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center w-full">
            <div className="min-w-[100px] sm:min-w-[120px] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/8 backdrop-blur-sm text-center flex-1 max-w-[140px]">
              <p className="text-[10px] sm:text-xs text-white/80 uppercase">
                Last Score
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {lastScore}
              </p>
            </div>
            <div className="min-w-[100px] sm:min-w-[120px] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/8 border border-white/8 backdrop-blur-sm text-center flex-1 max-w-[140px]">
              <p className="text-[10px] sm:text-xs text-white/80 uppercase">
                Best
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {highestScore}
              </p>
            </div>
          </div>

          {/* Primary action */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStart();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStart();
            }}
            className="mt-2 w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/12 text-white text-base sm:text-lg font-semibold hover:bg-white/14 active:bg-white/16 transition touch-manipulation"
          >
            Start Game
          </button>

          {/* Small action links */}
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center mt-2 w-full">
            <button
              onClick={handleBuyMeACoffee}
              className="text-xs sm:text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 active:bg-white/5 transition flex-1 min-w-[90px] touch-manipulation"
            >
              Buy Coffee
            </button>
            <button
              onClick={handleReportBug}
              className="text-xs sm:text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 active:bg-white/5 transition flex-1 min-w-[90px] touch-manipulation"
            >
              Report Bug
            </button>
            <button
              onClick={handleSuggest}
              className="text-xs sm:text-sm text-white/80 px-3 py-2 rounded-lg border border-white/6 hover:bg-white/3 active:bg-white/5 transition flex-1 min-w-[90px] touch-manipulation"
            >
              Suggest
            </button>
          </div>

          {/* Controls */}
          <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-white/70 w-full">
            <div className="mx-auto max-w-[420px] bg-white/3 p-2 sm:p-3 rounded-lg text-center">
              <p className="font-medium">Controls</p>
              <p className="mt-1">
                Press{" "}
                <kbd className="bg-black/70 text-white px-2 py-1 rounded text-[10px] sm:text-xs">
                  SPACE
                </kbd>{" "}
                or tap to jump
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
