export function nextStageAfter(currentStage) {
  if (currentStage === "intro") return "permaTest";
  // if (currentStage === "permaTest") return "unconsciousTest";
  if (currentStage === "permaTest") return "results";
  // if (currentStage === "unconsciousTest") return "results";
  return "results";
}
