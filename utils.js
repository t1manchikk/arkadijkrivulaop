// Утилітні функції
export function randomInt(max = 10) {
  // Повертає ціле число від 1 до max включно (як у прикладах завдань)
  return Math.ceil(Math.random() * Math.max(1, Math.floor(max)));
}
