const SUGGESTIONS = [
  "Consider taking an advanced speaking course to further refine your skills.",
  "Join a conversation club to practice speaking with others.",
  "Take an intermediate speaking course to improve your pronunciation and intonation.",
  "Practice speaking with a language partner to gain more confidence.",
  "Enroll in a basic speaking course to work on your articulation and clarity.",
  "Use language learning apps to practice speaking and listening.",
  "Work with a tutor to get personalized feedback on your speaking skills.",
  "Take a beginner speaking course to build a strong foundation.",
  "Practice speaking with a language partner to gain more confidence.",
  "Work with a tutor to get personalized feedback on your speaking skills."
];

const GetSuggestion = (score) => {
  const index = Math.min(Math.floor(score / 10), 9);
  return SUGGESTIONS[index];
}

export { GetSuggestion };