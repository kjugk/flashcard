import { shuffle, generateSequentialNumberList } from "./array-util";

describe("shuffle", () => {
  const ar = [1, 2, 3, 4, 5];

  test("配列を並び替える", () => {
    const shuffled = shuffle(ar);
    expect(shuffled).not.toEqual([1, 2, 3, 4, 5]);
  });
});

describe("generateSequentialNumberList", () => {
  test("シーケンシャルな配列を生成する。", () => {
    const ar = generateSequentialNumberList(3);

    expect(ar).toEqual([0, 1, 2]);
  });
});
