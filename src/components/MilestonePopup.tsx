import { useEffect, useState } from "react";

interface MilestonePopupProps {
  milestone: number | null;
}

const MilestonePopup = ({ milestone }: MilestonePopupProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (milestone) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [milestone]);

  if (!visible || !milestone) return null;

  // Different colors for different milestones
  const getColor = () => {
    if (milestone >= 100) return "from-yellow-400 to-orange-500";
    if (milestone >= 50) return "from-purple-400 to-pink-500";
    return "from-blue-400 to-cyan-500";
  };

  const getSize = () => {
    if (milestone >= 100) return "text-6xl";
    if (milestone >= 50) return "text-5xl";
    return "text-4xl";
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      <div
        className={`
          ${getSize()} font-black 
          bg-gradient-to-r ${getColor()} 
          bg-clip-text text-transparent
          animate-bounce
          drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
        `}
      >
        🎉 {milestone} POINTS! 🎉
      </div>
    </div>
  );
};

export default MilestonePopup;
