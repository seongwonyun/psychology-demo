export default function ResultSummary({
  diagnosisType,
  summary,
  coreIssues,
  perma,
}) {
  if (!diagnosisType) return null;
  return (
    <div className="space-y-4 mt-6">
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 text-gray-100">
        <h2 className="text-xl font-semibold mb-2">진단 결과</h2>
        <p className="text-emerald-300">{diagnosisType}</p>
        <p className="mt-2 text-gray-300">{summary}</p>
      </div>
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 text-gray-100">
        <h3 className="font-semibold mb-2">핵심 이슈</h3>
        <ul className="list-disc ml-5 text-gray-300">
          {coreIssues?.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 text-gray-100">
        <h3 className="font-semibold mb-2">PESMA 코드</h3>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(perma?.codes || {}).map(([k, v]) => (
            <div
              key={k}
              className="px-3 py-2 rounded-lg border border-gray-600 text-center"
            >
              <div className="text-xs text-gray-400">{k}</div>
              <div className="text-lg text-emerald-300">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
