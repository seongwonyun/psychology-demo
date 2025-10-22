// src/app/utils/diagnosis.js
import { getPrescriptionOptions } from "./prescriptions";

// ✅ anxietySum / depressionSum 없어도 안전하게 동작
export function makeDiagnosis({
  perma,
  anxietySum = 0,
  depressionSum = 0,
} = {}) {
  let diagnosisType = "healthy_maintenance";

  if (perma?.percent < 40 && depressionSum > 24) {
    diagnosisType = "severe_burnout";
  } else if (
    perma?.codes &&
    [perma.codes.P, perma.codes.E, perma.codes.A].every((c) =>
      ["N", "D", "L"].includes(c)
    )
  ) {
    diagnosisType = "energy_depletion";
  } else if (perma?.codes?.S === "I") {
    diagnosisType = "relationship_deficit";
  } else if (perma?.codes?.M === "U" && perma?.codes?.A === "L") {
    diagnosisType = "meaning_loss";
  } else if (anxietySum > 24 && anxietySum >= depressionSum) {
    diagnosisType = "anxiety_tension";
  } else if (perma?.percent >= 50 && perma?.percent < 65) {
    diagnosisType = "mild_stress";
  }

  return {
    diagnosisType,
    summary: summarize(diagnosisType),
    coreIssues: coreIssuesOf(diagnosisType),
    recommendations: getPrescriptionOptions(diagnosisType),
  };
}

function summarize(t) {
  const m = {
    severe_burnout: "장기간 스트레스로 심신 방전.",
    energy_depletion: "긍정/몰입/성취 저하.",
    relationship_deficit: "사회적 연결 부족.",
    meaning_loss: "의미/목적 약화.",
    anxiety_tension: "만성 긴장/불안.",
    mild_stress: "전반 양호하나 피로 축적.",
    healthy_maintenance: "정기적 자기돌봄 권장.",
  };
  return m[t] || "개요";
}

function coreIssuesOf(t) {
  const m = {
    severe_burnout: ["무기력", "정서 마비", "고립", "의미 상실"],
    energy_depletion: ["피로", "의욕 저하", "성취감 부족"],
    relationship_deficit: ["고립", "외로움", "소속감 결핍"],
    meaning_loss: ["의미 상실", "방향 상실"],
    anxiety_tension: ["과각성", "신체 증상"],
    mild_stress: ["휴식 필요"],
    healthy_maintenance: ["웰빙 유지", "예방적 관리"],
  };
  return m[t] || [];
}
