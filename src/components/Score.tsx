const Score = ({ score }: { score: number }) => (
  <div className="absolute top-5 left-1/2 -translate-x-1/2 text-5xl font-bold text-white [text-shadow:2px_2px_2px_black]">
    {score}
  </div>
);
export default Score;
