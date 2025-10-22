// // src/lib/sessionStore.js
// export const SS_KEYS = {
//   STATE: "mx:psych:v1:state",
//   HISTORY: "mx:psych:v1:history",
// };

// const hasWindow = () => typeof window !== "undefined";

// export function readState() {
//   if (!hasWindow()) return null;
//   try {
//     const raw = window.sessionStorage.getItem(SS_KEYS.STATE);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// export function writeState(partialOrUpdater) {
//   if (!hasWindow()) return;
//   try {
//     const prev = readState() || {};
//     const next =
//       typeof partialOrUpdater === "function"
//         ? partialOrUpdater(prev)
//         : { ...prev, ...partialOrUpdater };
//     window.sessionStorage.setItem(SS_KEYS.STATE, JSON.stringify(next));
//     return next;
//   } catch {}
// }

// export function clearState() {
//   if (!hasWindow()) return;
//   window.sessionStorage.removeItem(SS_KEYS.STATE);
//   window.sessionStorage.removeItem(SS_KEYS.HISTORY);
// }

// export function appendHistory(event) {
//   if (!hasWindow()) return;
//   try {
//     const raw = window.sessionStorage.getItem(SS_KEYS.HISTORY);
//     const arr = raw ? JSON.parse(raw) : [];
//     arr.push({ ts: Date.now(), ...event });
//     window.sessionStorage.setItem(SS_KEYS.HISTORY, JSON.stringify(arr));
//   } catch {}
// }

// export function readHistory() {
//   if (!hasWindow()) return [];
//   try {
//     const raw = window.sessionStorage.getItem(SS_KEYS.HISTORY);
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// }
