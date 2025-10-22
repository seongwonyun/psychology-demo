"use client";
import { useRouter } from "next/navigation";
import MatrixRain from "@/app/components/MatrixRain";
import { useTestStore } from "@/app/store/useTestStore";

export default function HomePage() {
  const router = useRouter();
  const { setStage, resetAll } = useTestStore();

  function start() {
    resetAll();
    setStage("permaTest");
    router.push("/test");
  }

  return (
    <main className="min-h-screen text-gray-100 relative">
      <MatrixRain />
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">Psychology Test</h1>
        <p className="mt-4 text-gray-300">
          PERMA와 무의식 신호로 나의 현재 상태를 점검해보세요.
        </p>
        <button
          onClick={start}
          className="mt-8 px-6 py-3 rounded-xl border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
        >
          시작하기
        </button>
      </section>
    </main>
  );
}
