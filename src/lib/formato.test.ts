import { describe, expect, it } from "vitest";
import { bs, pct, tex } from "./formato";

describe("formato", () => {
  it("miles con punto y decimales con coma", () => {
    expect(bs(10000)).toBe("10.000");
    expect(bs(2637.974)).toBe("2.637,97");
    expect(bs(1234567.891, 2)).toBe("1.234.567,89");
    expect(bs(5, 2)).toBe("5,00");
  });

  it("negativos con signo menos tipográfico, y sin «−0»", () => {
    expect(bs(-3.79, 2)).toBe("−3,79");
    expect(bs(-0.001, 2)).toBe("0,00");
  });

  it("porcentajes", () => {
    expect(pct(0.047619)).toBe("4,76%");
    expect(pct(0.1, 0)).toBe("10%");
  });

  it("listo para KaTeX", () => {
    expect(tex("2.637,97")).toBe("2.637{,}97");
    expect(tex("−3,79%")).toBe("-3{,}79\\%");
  });
});
