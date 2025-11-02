export function randomInt(max = 10) {
  return Math.ceil(Math.random() * Math.max(1, Math.floor(max)));
}
