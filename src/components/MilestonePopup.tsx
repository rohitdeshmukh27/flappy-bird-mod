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

  // Custom messages for each milestone
  const getMessage = () => {
    switch (milestone) {
      case 10:
        return "Less go 🧒🏿";
      case 20:
        return "Dont look here 🧒🏿";
      case 50:
        return "Half century Daddy";
      case 70:
        return "Lock In 🧒🏿";
      case 90:
        return "Legendary 🧒🏿";
      case 100:
        return "Extraordinary 🧒🏿";
      case 150:
        return "ABSOLUTE BEAST 🧒🏿";
      default:
        return "🧒🏿...I haven't coded further milestones";
    }
  };

  const getSize = () => {
    if (milestone >= 100) return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl";
    if (milestone >= 50) return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
    return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 px-4">
      <div
        className={`
          ${getSize()} font-bold 
          text-white/50
          text-center leading-tight
          max-w-[90vw]
        `}
      >
        {getMessage()}
      </div>
    </div>
  );
};

export default MilestonePopup;
