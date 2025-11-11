import React, { useEffect } from "react";

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onStart }) => {
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
    window.open(
      "https://github.com/rohitdeshmukh27/flappy-bird-mod/issues",
      "_blank"
    );
  };

  const handleSuggest = () => {
    window.open(
      "https://github.com/rohitdeshmukh27/flappy-bird-mod/discussions",
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1001] overflow-hidden">
      <div className="text-center p-8 md:p-12 mx-4 bg-white/95 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-[10px] max-w-[450px] w-[90%] animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          🐦 Flappy Bird
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          Tap or Press Space to Fly!
        </p>

        <button
          className="bg-green-500 hover:bg-green-600 text-white border-none px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-[0_3px_10px_rgba(76,175,80,0.3)] hover:shadow-[0_4px_15px_rgba(76,175,80,0.4)] hover:-translate-y-0.5 active:translate-y-0 mb-6 uppercase tracking-wide w-full md:w-auto"
          onClick={onStart}
        >
          START GAME
        </button>

        <div className="flex flex-col md:flex-row gap-2 mb-6 justify-center flex-wrap">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-300 font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            onClick={handleBuyMeACoffee}
          >
            ☕ Buy Me a Coffee
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-300 font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            onClick={handleReportBug}
          >
            🐛 Report Bug
          </button>
          <button
            className="bg-teal-400 hover:bg-teal-500 text-white border-none px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm rounded-md cursor-pointer transition-all duration-300 font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            onClick={handleSuggest}
          >
            💡 Suggest Something
          </button>
        </div>

        <div className="mt-4 p-3 bg-black/5 rounded-lg text-gray-600">
          <p className="my-1 text-xs md:text-sm">🎮 Controls:</p>
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
