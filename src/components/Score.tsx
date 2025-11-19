const Score = ({ score }: { score: number }) => (
  <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl font-bold text-white [text-shadow:2px_2px_2px_black]">
    {score}
  </div>
);
export default Score;
