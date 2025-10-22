import permaData from "@/app/data/perma";

export const PERMA_MIDPOINT = { P: 6, E: 6, S: 21, M: 6, A: 6 };
export const CODE_POS = { P: "P", E: "E", S: "S", M: "M", A: "A" };
export const CODE_NEG = { P: "N", E: "D", S: "I", M: "U", A: "L" };

/** 🔧 permaData 보정: S7은 항상 reverse_score=false로 강제 */
const permaSafe = {
  ...permaData,
  S: (permaData.S || []).map((q) =>
    q.id === "S7" ? { ...q, reverse_score: false } : q
  ),
};

/** 1~5 Likert 점수 유효성 보정 */
function normalizeLikert(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  if (num < 1) return 1;
  if (num > 5) return 5;
  return num;
}

/** 역채점: true면 6 - score, 아니면 그대로 */
function scoredValue(raw, reverse) {
  if (raw == null) return 0; // 미응답은 0으로 처리(기존 로직 준수)
  const v = normalizeLikert(raw);
  return reverse ? 6 - v : v;
}

/** 질문 배열 기반 합계 */
function sumLikertByQuestions(answersObj, questions) {
  return questions.reduce((acc, q) => {
    const raw = answersObj?.[q.id];
    return acc + scoredValue(raw, q.reverse_score === true);
  }, 0);
}

export function computePermaScores(answersPerma) {
  const groups = {
    P: permaSafe.P,
    E: permaSafe.E,
    S: permaSafe.S,
    M: permaSafe.M,
    A: permaSafe.A,
  };

  // 영역별 합계(역채점 반영)
  const sums = {};
  for (const k of Object.keys(groups)) {
    sums[k] = sumLikertByQuestions(answersPerma, groups[k]);
  }

  // 중간값 기준 코드화
  const codes = {};
  for (const k of Object.keys(sums)) {
    codes[k] = sums[k] > PERMA_MIDPOINT[k] ? CODE_POS[k] : CODE_NEG[k];
  }

  // 전체 합계 및 백분위(전체 문항 15개 → 15~75 범위)
  const total = Object.values(sums).reduce((a, b) => a + b, 0);
  const rawPercent = ((total - 15) / (75 - 15)) * 100;
  const percent = Math.max(0, Math.min(100, Math.round(rawPercent))); // 0~100 보정

  return { sums, codes, total, percent };
}
