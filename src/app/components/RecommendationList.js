// export default function RecommendationList({ items }) {
//   if (!items?.length) return null;
//   return (
//     <div className="grid md:grid-cols-3 gap-4 mt-6">
//       {items.map((it) => (
//         <div
//           key={it.id}
//           className="bg-black/40 border border-emerald-500/30 rounded-2xl p-5 text-gray-100"
//         >
//           <div className="text-2xl">{it.emoji}</div>
//           <div className="mt-2 font-semibold">{it.name}</div>
//           <div className="text-sm text-gray-400">{it.subtitle}</div>
//           <div className="mt-3 text-emerald-300">{it.tagline}</div>
//           <div className="mt-2 text-sm text-gray-300">
//             {it.type} · {it.duration} · {it.location}
//           </div>
//           <div className="mt-2 text-xs text-gray-400">
//             주요 활동: {it.mainActivities?.join(", ")}
//           </div>
//           <div className="mt-1 text-xs text-gray-400">
//             적합: {it.suitable} · 비용: {it.cost}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useMemo, useState } from "react";

// /**
//  * RecommendationList
//  * - 카드 리스트 + (선택/탭 전환) + 선택 상세 표시까지 포함한 확장형
//  *
//  * Props
//  * - items: [{ id, emoji, name, subtitle, tagline, type, duration, location, mainActivities, suitable, cost, focus }]
//  * - defaultSelectedId?: string   // 초깃값 (없으면 첫 카드)
//  * - onSelect?: (id) => void      // 외부 제어 훅 (선택 변경 알림)
//  * - showDetail?: boolean         // 선택 상세 영역 렌더링 여부 (기본 true)
//  * - renderDetail?: (item) => JSX // 상세 커스터마이즈 (없으면 기본 상세)
//  * - selectable?: boolean         // 카드 선택 가능 여부 (기본 true)
//  */
// export default function RecommendationList({
//   items,
//   defaultSelectedId,
//   onSelect,
//   showDetail = true,
//   renderDetail,
//   selectable = true,
// }) {
//   if (!items?.length) return null;

//   const initialId = useMemo(
//     () => defaultSelectedId ?? items[0]?.id,
//     [defaultSelectedId, items]
//   );

//   const [selectedId, setSelectedId] = useState(initialId);

//   const selectedItem = useMemo(
//     () => items.find((it) => it.id === selectedId),
//     [items, selectedId]
//   );

//   const handleSelect = (id) => {
//     if (!selectable) return;
//     setSelectedId(id);
//     onSelect?.(id);
//   };

//   return (
//     <div className="mt-6 space-y-6">
//       {/* 탭/카드 리스트 */}
//       <div
//         className="grid md:grid-cols-3 gap-4"
//         role={selectable ? "tablist" : undefined}
//         aria-label="Recommendation options"
//       >
//         {items.map((it) => {
//           const isSelected = selectable && it.id === selectedId;
//           return (
//             <button
//               key={it.id}
//               type="button"
//               role={selectable ? "tab" : undefined}
//               aria-selected={isSelected}
//               onClick={() => handleSelect(it.id)}
//               className={[
//                 "text-left rounded-2xl p-5 border transition-all",
//                 "bg-black/40 border-emerald-500/30 text-gray-100",
//                 selectable
//                   ? "hover:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
//                   : "cursor-default",
//                 isSelected
//                   ? "border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
//                   : "",
//               ].join(" ")}
//             >
//               <div className="text-2xl">{it.emoji}</div>
//               <div className="mt-2 font-semibold">{it.name}</div>
//               <div className="text-sm text-gray-400">{it.subtitle}</div>
//               <div className="mt-3 text-emerald-300">{it.tagline}</div>
//               <div className="mt-2 text-sm text-gray-300">
//                 {it.type} · {it.duration} · {it.location}
//               </div>
//               <div className="mt-2 text-xs text-gray-400">
//                 주요 활동: {it.mainActivities?.join(", ")}
//               </div>
//               <div className="mt-1 text-xs text-gray-400">
//                 적합: {it.suitable} · 비용: {it.cost}
//               </div>

//               {isSelected && selectable && (
//                 <div className="mt-3 inline-flex items-center gap-2 text-emerald-300 text-xs">
//                   <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//                   선택됨
//                 </div>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* 선택 상세 (옵션) */}
//       {showDetail && selectedItem && (
//         <div className="rounded-2xl border border-emerald-500/40 bg-black/50 p-6">
//           {renderDetail ? (
//             renderDetail(selectedItem)
//           ) : (
//             <DefaultDetail item={selectedItem} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// /** 기본 상세 UI — 필요 시 renderDetail로 교체 가능 */
// function DefaultDetail({ item }) {
//   return (
//     <div className="text-sm">
//       <div className="flex items-start gap-4">
//         <div className="text-4xl">{item.emoji}</div>
//         <div>
//           <div className="text-emerald-300 font-semibold text-lg">
//             {item.type}
//           </div>
//           <div className="text-gray-400">
//             {item.duration} · {item.location} · {item.cost}
//           </div>
//           {item.tagline && (
//             <div className="mt-2 text-emerald-200">{item.tagline}</div>
//           )}
//         </div>
//       </div>

//       {/* 목표/포커스 */}
//       {item.focus?.length > 0 && (
//         <div className="mt-4">
//           <div className="text-gray-300 mb-2">목표</div>
//           <div className="flex flex-wrap gap-2">
//             {item.focus.map((f, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-200 bg-emerald-500/10"
//               >
//                 {f}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 활동 목록 */}
//       {item.mainActivities?.length > 0 && (
//         <div className="mt-4">
//           <div className="text-gray-300 mb-2">주요 활동</div>
//           <ul className="grid sm:grid-cols-2 gap-2 text-gray-200">
//             {item.mainActivities.map((act, i) => (
//               <li
//                 key={i}
//                 className="rounded-lg border border-emerald-500/30 bg-black/40 px-3 py-2"
//               >
//                 {act}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* 경고/고지 문구(선택) */}
//       <p className="mt-6 text-xs text-red-300/90">
//         ※ 본 결과는 참고용이며, 증상이 지속되면 전문가 상담을 권장합니다.
//       </p>
//     </div>
//   );
// }

//디버그 있음
// src/app/components/RecommendationList.jsx
"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function RecommendationList({
  items,
  defaultSelectedId,
  onSelect,
  showDetail = true,
  renderDetail,
  selectable = true,
}) {
  if (!items?.length) return null;

  const computedDefaultId = useMemo(
    () => defaultSelectedId ?? items[0]?.id,
    [defaultSelectedId, items]
  );

  const [selectedId, setSelectedId] = useState(computedDefaultId);

  // ✅ items / defaultSelectedId 변경 시 선택 동기화
  useEffect(() => {
    setSelectedId(computedDefaultId);
  }, [computedDefaultId]);

  const selectedItem = useMemo(
    () => items.find((it) => it.id === selectedId),
    [items, selectedId]
  );

  const handleSelect = (id) => {
    if (!selectable) return;
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="mt-6 space-y-6">
      <div
        className="grid md:grid-cols-3 gap-4"
        role={selectable ? "tablist" : undefined}
      >
        {items.map((it) => {
          const isSelected = selectable && it.id === selectedId;
          return (
            <button
              key={it.id}
              type="button"
              role={selectable ? "tab" : undefined}
              aria-selected={isSelected}
              onClick={() => handleSelect(it.id)}
              className={[
                "text-left rounded-2xl p-5 border transition-all",
                "bg-black/40 border-emerald-500/30 text-gray-100",
                selectable
                  ? "hover:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                  : "cursor-default",
                isSelected
                  ? "border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                  : "",
              ].join(" ")}
            >
              <div className="text-2xl">{it.emoji}</div>
              <div className="mt-2 font-semibold">{it.name}</div>
              <div className="text-sm text-gray-400">{it.subtitle}</div>
              <div className="mt-3 text-emerald-300">{it.tagline}</div>
              <div className="mt-2 text-sm text-gray-300">
                {it.type} · {it.duration} · {it.location}
              </div>
              <div className="mt-2 text-xs text-gray-400">
                주요 활동: {it.mainActivities?.join(", ")}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                적합: {it.suitable} · 비용: {it.cost}
              </div>
              {isSelected && selectable && (
                <div className="mt-3 inline-flex items-center gap-2 text-emerald-300 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  선택됨
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showDetail && selectedItem && (
        <div className="rounded-2xl border border-emerald-500/40 bg-black/50 p-6">
          {renderDetail ? (
            renderDetail(selectedItem)
          ) : (
            <DefaultDetail item={selectedItem} />
          )}
        </div>
      )}
    </div>
  );
}

function DefaultDetail({ item }) {
  return (
    <div className="text-sm">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{item.emoji}</div>
        <div>
          <div className="text-emerald-300 font-semibold text-lg">
            {item.type}
          </div>
          <div className="text-gray-400">
            {item.duration} · {item.location} · {item.cost}
          </div>
          {item.tagline && (
            <div className="mt-2 text-emerald-200">{item.tagline}</div>
          )}
        </div>
      </div>

      {item.focus?.length > 0 && (
        <div className="mt-4">
          <div className="text-gray-300 mb-2">목표</div>
          <div className="flex flex-wrap gap-2">
            {item.focus.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-200 bg-emerald-500/10"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.mainActivities?.length > 0 && (
        <div className="mt-4">
          <div className="text-gray-300 mb-2">주요 활동</div>
          <ul className="grid sm:grid-cols-2 gap-2 text-gray-200">
            {item.mainActivities.map((act, i) => (
              <li
                key={i}
                className="rounded-lg border border-emerald-500/30 bg-black/40 px-3 py-2"
              >
                {act}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-red-300/90">
        ※ 본 결과는 참고용이며, 증상이 지속되면 전문가 상담을 권장합니다.
      </p>
    </div>
  );
}
