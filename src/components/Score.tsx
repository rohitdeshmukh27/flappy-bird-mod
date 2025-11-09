const Score = ({ score }: { score: number }) => (
  <div style={{
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "40px",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 2px black"
  }}>
    {score}
  </div>
);
export default Score;
