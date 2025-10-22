export function sumByIds(answersObj, ids) {
  return ids.reduce((acc, id) => acc + (Number(answersObj?.[id]) || 0), 0);
}

export function avgByIds(answersObj, ids) {
  if (!ids?.length) return 0;
  return sumByIds(answersObj, ids) / ids.length;
}
