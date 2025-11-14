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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001] overflow-hidden">
      <div className="text-center p-8 md:p-12 mx-4 max-w-[650px] w-[90%] animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          Flappy Bird
        </h1>

        {/* Score Display */}
        <div className="mb-6 flex justify-center gap-4 flex-wrap">
          {lastScore > 0 && (
            <div className="bg-gradient-to-b from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                Last Score
              </p>
              <p className="text-2xl font-bold">{lastScore}</p>
            </div>
          )}
          {highestScore > 0 && (
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-gray-800 px-4 py-2 rounded-lg shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                Highest Score
              </p>
              <p className="text-2xl font-bold">{highestScore}</p>
            </div>
          )}
        </div>

        <button
          className="bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white border-none px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold rounded-lg cursor-pointer transition-all duration-200 shadow-[0_6px_0_0_#15803d,0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_0_#15803d,0_6px_12px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_#15803d,0_3px_8px_rgba(0,0,0,0.3)] mb-6 uppercase tracking-wide w-full md:w-auto"
          onClick={onStart}
        >
          START GAME
        </button>

        <div className="flex flex-row gap-2 mb-6 justify-center flex-wrap">
          <button
            className="bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-gray-800 border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-200 font-medium shadow-[0_4px_0_0_#b45309,0_6px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_0_0_#b45309,0_4px_8px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#b45309,0_2px_5px_rgba(0,0,0,0.25)] whitespace-nowrap flex items-center justify-center gap-1.5"
            onClick={handleBuyMeACoffee}
          >
            <img
              src="https://em-content.zobj.net/source/apple/419/beer-mug_1f37a.png"
              alt="coffee"
              className="w-4 h-4 md:w-5 md:h-5 object-contain"
            />
            <span>Buy Me a Coffee</span>
          </button>
          <button
            className="bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-200 font-medium shadow-[0_4px_0_0_#991b1b,0_6px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_0_0_#991b1b,0_4px_8px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#991b1b,0_2px_5px_rgba(0,0,0,0.25)] whitespace-nowrap flex items-center justify-center gap-1.5"
            onClick={handleReportBug}
          >
            <img
              src="https://em-content.zobj.net/source/apple/419/bug_1f41b.png"
              alt="bug"
              className="w-4 h-4 md:w-5 md:h-5 object-contain"
            />
            <span>Report Bug</span>
          </button>
          <button
            className="bg-gradient-to-b from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-200 font-medium shadow-[0_4px_0_0_#0f766e,0_6px_10px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_0_0_#0f766e,0_4px_8px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#0f766e,0_2px_5px_rgba(0,0,0,0.25)] whitespace-nowrap flex items-center justify-center gap-1.5"
            onClick={handleSuggest}
          >
            <img
              src="https://em-content.zobj.net/source/apple/419/pencil_270f-fe0f.png"
              alt="pencil"
              className="w-4 h-4 md:w-5 md:h-5 object-contain"
            />
            <span>Suggest Something</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg text-gray-600">
          <p className="my-1 text-xs md:text-sm font-bold">Controls:</p>
          <p className="my-1 text-xs md:text-sm">
            • Press{" "}
            <kbd className="bg-gray-800 text-white px-2 py-1 rounded font-mono font-bold text-xs">
              SPACE
            </kbd>{" "}
            or click/tap to jump
          </p>
          <p className="my-1 text-xs md:text-sm">• Avoid the pipes!</p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
