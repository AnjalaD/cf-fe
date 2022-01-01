export function decodeTime(t) {
  const dh = Math.floor(t / 60);
  const DD = Math.floor(dh / 24)
    .toString()
    .padStart(2, "0");
  const hh = (dh % 24).toString().padStart(2, "0");
  const mm = (t % 60).toString().padStart(2, "0");
  return `2022-01-${DD}T${hh}:${mm}`;
}
