import { shuffle, generateSequentialNumberList } from "./array-util";

describe("shuffle", () => {
  const ar = [1, 2, 3, 4, 5];

  test("配列を並び替える", () => {
    const shuffled = shuffle(ar);

    expect(shuffled.length).toBe(ar.length);
    expect(shuffled[0]).not.toBe(1);
    expect(shuffled[1]).not.toBe(2);
    expect(shuffled[2]).not.toBe(3);
    expect(shuffled[3]).not.toBe(4);
    expect(shuffled[4]).not.toBe(5);
  });
});

describe("generateSequentialNumberList", () => {
  test("シーケンシャルな配列を生成する。", () => {
    const ar = generateSequentialNumberList(3);

    expect(ar.length).toBe(3);
    expect(ar[0]).toBe(0);
    expect(ar[1]).toBe(1);
    expect(ar[2]).toBe(2);
  });
});
