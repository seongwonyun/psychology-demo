"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTestStore } from "@/app/store/useTestStore";
import { getDiagnosis } from "@/app/utils/diagnosisCatalog";
import DiagnosisCard from "@/app/components/DiagnosisCard";
import ResultSummary from "@/app/components/ResultSummary";
import RecommendationList from "@/app/components/RecommendationList";
import ProgressBar from "@/app/components/ProgressBar";

export default function ResultsPage() {
  const router = useRouter();
  const { results, resetAll } = useTestStore();

  // ✅ results 없으면 /test로 부드럽게 이동 (깜빡임 최소화)
  useEffect(() => {
    if (!results) router.replace("/test");
  }, [results, router]);

  if (!results) return null; // 이동 직전 빈 화면 방지용 가드

  const { perma, diagnosis } = results;

  // 1) 기존 위치들에서 코드 탐색
  const rawCodePrimary =
    results?.diagnosis?.permaCode ??
    results?.diagnosis?.code ??
    results?.diagnosis?.typeCode ??
    results?.permaCode ??
    results?.code ??
    results?.typeCode ??
    null;

  // 2) 폴백: perma.codes를 P→E→S→M→A 순서로 이은 문자열 생성
  //    예) {P:"N",E:"D",S:"I",M:"U",A:"L"} → "NDIUL"
  const rawCodeFallback =
    perma?.codes && ["P", "E", "S", "M", "A"].every((k) => perma.codes[k])
      ? ["P", "E", "S", "M", "A"].map((k) => String(perma.codes[k])).join("")
      : null;

  // 최종 코드(표시용/정규화용)
  const rawCode = rawCodePrimary ?? rawCodeFallback;
  const displayCode = rawCode ? String(rawCode) : null;
  const normalizedCode = rawCode ? String(rawCode).trim().toLowerCase() : null;

  // 진단 정보 조회
  const info = getDiagnosis(normalizedCode);

  // 추천 목록 안전 처리
  const recItems = Array.isArray(diagnosis?.recommendations)
    ? diagnosis.recommendations
    : [];

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">나의 여행 성향 진단</h1>

      {info ? (
        <DiagnosisCard code={displayCode} name={info.name} desc={info.desc} />
      ) : (
        <div className="rounded-xl border border-white/10 p-4">
          <p className="opacity-80 mb-1">
            진단 코드를 찾을 수 없습니다. 관리자에게 문의해주세요.
          </p>
          {displayCode && (
            <p className="text-sm opacity-60">
              (참고: 계산된 코드 값:{" "}
              <span className="font-mono">{displayCode}</span>)
            </p>
          )}
        </div>
      )}

      <ResultSummary
        diagnosisType={diagnosis?.diagnosisType}
        summary={diagnosis?.summary}
        coreIssues={diagnosis?.coreIssues}
        perma={perma}
      />

      <div className="text-center mt-8">
        <h2>당신의 PESMA 행복지수는</h2>
        <p className="text-4xl font-bold text-green-400">{perma.percent}%</p>
        <ProgressBar value={perma.percent} />
      </div>

      <h2 className="mt-8 text-xl font-semibold">추천(도전/유지/화해)</h2>
      {recItems.length > 0 ? (
        <RecommendationList items={recItems} />
      ) : (
        <p className="opacity-70 mt-2">
          추천 항목이 아직 없습니다. 테스트 문항을 더 완료하거나 계산 로직을
          확인해주세요.
        </p>
      )}

      <div className="mt-10 flex gap-3">
        <button
          className="px-4 py-2 rounded-xl border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
          onClick={() => {
            // TODO: 저장 API 연동
            alert("결과가 임시 저장되었습니다. (데모)");
          }}
        >
          결과 저장
        </button>
        <button
          className="px-4 py-2 rounded-xl border border-gray-600 text-gray-200"
          onClick={() => {
            resetAll();
            router.push("/");
          }}
        >
          다시 하기
        </button>
      </div>

      {/* 🧪 Dev 전용 디버그 패널 */}
      {isDev && (
        <div className="mt-10 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm">
          <p className="font-semibold mb-2">DEBUG</p>
          <ul className="grid gap-1">
            <li>
              <span className="opacity-70">rawCodePrimary: </span>
              <span className="font-mono">{String(rawCodePrimary)}</span>
            </li>
            <li>
              <span className="opacity-70">rawCodeFallback: </span>
              <span className="font-mono">{String(rawCodeFallback)}</span>
            </li>
            <li>
              <span className="opacity-70">displayCode: </span>
              <span className="font-mono">{String(displayCode)}</span>
            </li>
            <li>
              <span className="opacity-70">normalizedCode: </span>
              <span className="font-mono">{String(normalizedCode)}</span>
            </li>
            <li>
              <span className="opacity-70">matched: </span>
              <span className="font-mono">{info ? "true" : "false"}</span>
            </li>
            <li>
              <span className="opacity-70">perma.codes: </span>
              <span className="font-mono">
                {perma?.codes ? JSON.stringify(perma.codes) : "null"}
              </span>
            </li>
          </ul>
          <details className="mt-3">
            <summary className="cursor-pointer">results 객체 펼치기</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs opacity-90">
              {JSON.stringify(results, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </main>
  );
}
