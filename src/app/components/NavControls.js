export default function NavControls({
  canPrev,
  canNext,
  isLast,
  onPrev,
  onNext,
  onFinish,
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        className="px-4 py-2 rounded-xl border border-gray-600 text-gray-200 disabled:opacity-40"
        onClick={onPrev}
        disabled={!canPrev}
      >
        이전
      </button>
      {isLast ? (
        <button
          className="px-4 py-2 rounded-xl border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-40"
          onClick={onFinish}
          disabled={!canNext}
        >
          완료
        </button>
      ) : (
        <button
          className="px-4 py-2 rounded-xl border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-40"
          onClick={onNext}
          disabled={!canNext}
        >
          다음
        </button>
      )}
    </div>
  );
}
