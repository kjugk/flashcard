export function shuffle<T>(array: T[]): T[] {
  // TODO deep copy するか検討
  const copied = array.slice();
  if (copied.length <= 1) return copied;

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = copied[i];

    copied[i] = copied[j];
    copied[j] = temp;
  }

  return copied;
}

export function generateSequentialNumberList(length: number) {
  return Array.from(Array(length).keys());
}
