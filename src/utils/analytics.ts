import ReactGA from "react-ga4";

// Replace with your actual Google Analytics Measurement ID
const MEASUREMENT_ID = "YOUR_MEASUREMENT_ID";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      debug_mode: true, // Remove this in production
    },
  });
};

// Track when a game session starts
export const trackGameStart = () => {
  ReactGA.event({
    category: "Game",
    action: "game_start",
    label: "Game Session Started",
  });
};

// Track when a game session ends
export const trackGameEnd = (score: number, duration: number) => {
  ReactGA.event({
    category: "Game",
    action: "game_end",
    label: "Game Session Ended",
    value: score,
  });

  // Track session duration as a separate event
  ReactGA.event({
    category: "Engagement",
    action: "session_duration",
    label: "Time Played",
    value: Math.round(duration), // duration in seconds
  });
};

// Track milestone achievements
export const trackMilestone = (milestone: number) => {
  ReactGA.event({
    category: "Achievement",
    action: "milestone_reached",
    label: `Score ${milestone}`,
    value: milestone,
  });
};

// Track high score
export const trackHighScore = (score: number) => {
  ReactGA.event({
    category: "Achievement",
    action: "high_score",
    label: "New High Score",
    value: score,
  });
};
