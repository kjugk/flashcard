import { numberToDateString } from "./date-util";

describe("numberToDateString", () => {
  const number = 1602930078415;

  test("フォーマットを指定しない場合はYYYY/MM/DD", () => {
    expect(numberToDateString(number)).toBe("2020/10/17");
  });

  test("フォーマットを指定できる", () => {
    expect(numberToDateString(number, "YYYY")).toBe("2020");
  });
});
