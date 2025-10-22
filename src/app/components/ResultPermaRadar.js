"use client";

export default function ResultCards({ results }) {
  if (!results) return null;
  const ts = new Date().toLocaleString();
  const severities = {
    high: { color: "#FF3333", name: "CRITICAL", glow: "rgba(255,51,51,.5)" },
    medium: { color: "#FFD700", name: "WARNING", glow: "rgba(255,215,0,.5)" },
    low: { color: "#00FF00", name: "STABLE", glow: "rgba(0,255,0,.5)" },
  };
  const sv = severities[results.severity] || severities.low;

  const getLabel = (pct) => {
    if (pct >= 80) return { text: "OPTIMAL", color: "#00FF00" };
    if (pct >= 60) return { text: "NORMAL", color: "#00FFFF" };
    if (pct >= 40) return { text: "CAUTION", color: "#FFD700" };
    return { text: "CRITICAL", color: "#FF3333" };
  };

  return (
    <div className="space-y-8">
      {/* 요약/진단 */}
      <div
        className="border-4 p-6"
        style={{
          borderColor: "#22c55e",
          background: "rgba(0,0,0,.85)",
          boxShadow: `0 0 30px #22c55e66`,
        }}
      >
        <div className="flex items-center justify-between text-sm mb-3">
          <span style={{ color: sv.color }}>SYSTEM STATUS: {sv.name}</span>
          <span className="text-green-600">TIMESTAMP: {ts}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: sv.color }}>
          {results.diagnosis}
        </h3>
        {!!results.detailedAnalysis && (
          <div className="text-green-400">
            <p className="mb-2">&gt;&gt; {results.detailedAnalysis.summary}</p>
            <div className="flex flex-wrap gap-2">
              {(results.detailedAnalysis.coreIssues || []).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-green-700 text-green-500 bg-black text-xs"
                >
                  [ {t} ]
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PERMA 바 + 총점 */}
      <div>
        <h4 className="mb-3 text-green-400 font-bold">PERMA WELLBEING INDEX</h4>
        <div className="space-y-3">
          {Object.entries(results.perma.scores).map(([k, v]) => {
            const pct = Math.round((v / 5) * 100);
            const label = getLabel(pct);
            const names = {
              P: "POSITIVE",
              E: "ENGAGEMENT",
              R: "RELATIONSHIPS",
              M: "MEANING",
              A: "ACHIEVEMENT",
            };
            return (
              <div key={k} className="border border-green-900 p-3 bg-black/50">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-500 font-semibold">
                    [ {names[k]} ]
                  </span>
                  <span className="font-bold" style={{ color: label.color }}>
                    {pct} :: {label.text}
                  </span>
                </div>
                <div className="w-full bg-black h-3 border border-green-900">
                  <div
                    className="h-full"
                    style={{ width: `${pct}%`, background: label.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-4 border-2 border-green-600 bg-black/40">
          <div className="flex items-center justify-between">
            <span className="text-green-400">TOTAL SYSTEM SCORE</span>
            <span className="text-2xl font-bold text-green-500">
              {results.perma.average} / 100
            </span>
          </div>
        </div>
      </div>

      {/* 부가 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        {results.cognitive != null && (
          <div
            className="border p-4"
            style={{ borderColor: "#00FFFF66", background: "rgba(0,50,50,.2)" }}
          >
            <div className="text-cyan-400 mb-1">COGNITIVE LOAD</div>
            <div className="text-2xl font-bold text-cyan-500">
              {Math.round(results.cognitive)}
            </div>
          </div>
        )}
        {(results.depression != null || results.anxiety != null) && (
          <div
            className="border p-4"
            style={{ borderColor: "#FF333366", background: "rgba(50,0,0,.2)" }}
          >
            <div className="text-red-400 mb-1">CLINICAL MARKERS</div>
            {results.depression != null && (
              <div className="font-bold text-red-500">
                DEP: {Math.round(results.depression)}
              </div>
            )}
            {results.anxiety != null && (
              <div className="font-bold text-red-400">
                ANX: {Math.round(results.anxiety)}
              </div>
            )}
          </div>
        )}
        <div
          className="border p-4"
          style={{ borderColor: "#00FF0066", background: "rgba(0,50,0,.2)" }}
        >
          <div className="text-green-400 mb-1">SOCIAL CONNECTION</div>
          <div className="text-2xl font-bold text-green-500">
            {Math.round(results.social)}
          </div>
        </div>
      </div>
    </div>
  );
}
