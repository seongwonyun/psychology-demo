"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTestStore } from "@/app/store/useTestStore";
import permaData from "@/app/data/perma";
import uncData from "@/app/data/unconscious"; // 기본 export만 사용
import StageHeader from "@/app/components/StageHeader";
import QuestionCard from "@/app/components/QuestionCard";
import NavControls from "@/app/components/NavControls";
import { nextStageAfter } from "@/app/utils/flow";
import { computePermaScores } from "@/app/utils/perma";
import { makeDiagnosis } from "@/app/utils/diagnosis"; // ✅ 진단 계산 추가
import MatrixRain from "@/app/components/MatrixRain"; // 배경

// const steps = ["intro", "permaTest", "unconsciousTest", "results"];
const steps = ["intro", "permaTest", "results"];

function flatten(obj) {
  return Array.isArray(obj) ? obj : Object.values(obj || {}).flat();
}

export default function TestPage() {
  const router = useRouter();
  const {
    currentStage,
    currentIndex,
    setIndex,
    setStage,
    answers,
    saveAnswer,
    setResults,
  } = useTestStore();

  // intro -> permaTest 자동 진입
  useEffect(() => {
    if (currentStage === "intro") setStage("permaTest");
  }, [currentStage, setStage]);

  const bundle = useMemo(() => {
    if (currentStage === "permaTest") {
      return { key: "perma", items: flatten(permaData) };
    }
    if (currentStage === "unconsciousTest") {
      return { key: "unconscious", items: flatten(uncData) };
    }
    return { key: null, items: [] };
  }, [currentStage]);

  const total = bundle.items.length;
  const q = bundle.items[currentIndex];
  const val = bundle.key ? answers[bundle.key]?.[q?.id] : undefined;

  // 🔎 DEBUG: 상태 스냅샷 (개발환경에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    console.groupCollapsed(
      `%c[Test Debug] ${new Date().toLocaleTimeString()} — ${currentStage} #${currentIndex}`,
      "color:#10b981;font-weight:bold"
    );
    console.log("stage:", currentStage);
    console.log("index:", currentIndex, "/", Math.max(total - 1, 0));
    console.log("questionId:", q?.id);
    console.log("value:", val);
    console.log("answers snapshot:", answers);
    console.groupEnd();
    try {
      const raw = sessionStorage.getItem("mx:psych:v1:state");
      if (raw) console.debug("[sessionStorage]", JSON.parse(raw));
    } catch {}
  }, [currentStage, currentIndex, val, answers, total, q?.id]);

  function onNext() {
    if (currentIndex < total - 1) {
      setIndex(currentIndex + 1);
      return;
    }
    // 단계 완료 처리
    const next = nextStageAfter(currentStage);
    if (next === "results") {
      const perma = computePermaScores(answers.perma || {});

      // ✅ ANX/DEP 지금 미사용 → 0으로 넣어서 기준 로직 정상 작동
      const diagnosis = makeDiagnosis({
        perma,
        anxietySum: 0,
        depressionSum: 0,
      });

      if (process.env.NODE_ENV !== "production") {
        console.groupCollapsed("%c[Result Debug] 계산 결과", "color:#60a5fa");
        console.log("perma:", perma);
        console.log("diagnosis:", diagnosis);
        console.groupEnd();
      }

      // ✅ 결과 저장: perma + diagnosis
      setResults({ perma, diagnosis });
      router.push("/results");
    } else {
      setStage(next);
    }
  }

  return (
    <main className="min-h-screen relative">
      {/* 배경 */}
      <MatrixRain />

      {/* 👀 DEBUG 미니 패널 (개발환경에서만) */}
      {process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-3 right-3 z-[9999] rounded-lg border border-emerald-500/40 bg-black/70 text-emerald-200 text-[11px] px-3 py-2">
          <div>
            Stage: <b className="text-white">{currentStage}</b>
          </div>
          <div>
            Index: <b className="text-white">{currentIndex}</b> /{" "}
            {Math.max(total - 1, 0)}
          </div>
          <div>
            QID: <b className="text-white">{q?.id ?? "-"}</b>
          </div>
          <div>
            Val: <b className="text-white">{String(val ?? "-")}</b>
          </div>
        </div>
      )}

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10">
        <StageHeader
          currentStage={currentStage}
          currentIndex={currentIndex}
          total={total}
          steps={steps}
        />
        <section className="max-w-3xl mx-auto px-4 py-10">
          {q && (
            <QuestionCard
              question={q}
              value={val}
              onChange={(v) => {
                if (process.env.NODE_ENV !== "production") {
                  const before = answers[bundle.key]?.[q.id];
                  console.debug(
                    "[saveAnswer] %s.%s: %o -> %o",
                    bundle.key,
                    q.id,
                    before,
                    v
                  );
                }
                saveAnswer(bundle.key, q.id, v);
              }}
            />
          )}
          <NavControls
            canPrev={currentIndex > 0}
            canNext={!!val}
            isLast={currentIndex === total - 1}
            onPrev={() => setIndex(currentIndex - 1)}
            onNext={onNext}
            onFinish={onNext}
          />
        </section>
      </div>
    </main>
  );
}
