// // src/hooks/useSessionPersist.js
// "use client";
// import { useEffect, useRef } from "react";
// import { readState, writeState } from "@/lib/sessionStore";

// /**
//  * deps의 상태가 바뀔 때마다 sessionStorage에 병합 저장.
//  * - onHydrate: 최초 마운트 시 저장된 값을 리액트 상태로 복구.
//  * - pick: 현재 리액트 상태에서 저장할 조각만 반환.
//  */
// export function useSessionPersist({ deps, pick, onHydrate, debounceMs = 120 }) {
//   const t = useRef(null);

//   // 복구
//   useEffect(() => {
//     const saved = readState();
//     if (saved && onHydrate) onHydrate(saved);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // 저장
//   useEffect(() => {
//     if (!pick) return;
//     if (t.current) clearTimeout(t.current);
//     t.current = setTimeout(() => writeState(pick()), debounceMs);
//     return () => clearTimeout(t.current);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);
// }
