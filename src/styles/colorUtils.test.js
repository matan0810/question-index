import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, blendHex, darkenHex } from "./colorUtils";

describe("hexToRgb", () => {
  it("parses a hex color into RGB components", () => {
    expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
    expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
    expect(hexToRgb("#ff8800")).toEqual([255, 136, 0]);
  });

  it("parses mixed-case hex", () => {
    expect(hexToRgb("#FF8800")).toEqual([255, 136, 0]);
  });
});

describe("rgbToHex", () => {
  it("formats RGB components into a hex string", () => {
    expect(rgbToHex([255, 255, 255])).toBe("#ffffff");
    expect(rgbToHex([0, 0, 0])).toBe("#000000");
    expect(rgbToHex([255, 136, 0])).toBe("#ff8800");
  });

  it("zero-pads single-digit channels", () => {
    expect(rgbToHex([0, 16, 1])).toBe("#001001");
  });

  it("rounds fractional channel values", () => {
    expect(rgbToHex([0.4, 0.6, 255.4])).toBe("#0001ff");
  });

  it("clamps values below 0 and above 255", () => {
    expect(rgbToHex([-10, 300, 128])).toBe("#00ff80");
  });
});

describe("hexToRgb / rgbToHex round trip", () => {
  it("is stable for arbitrary colors", () => {
    for (const hex of ["#123456", "#abcdef", "#0f0f0f", "#ff00aa"]) {
      expect(rgbToHex(hexToRgb(hex))).toBe(hex);
    }
  });
});

describe("blendHex", () => {
  it("returns the first color at t=0", () => {
    expect(blendHex("#000000", "#ffffff", 0)).toBe("#000000");
  });

  it("returns the second color at t=1", () => {
    expect(blendHex("#000000", "#ffffff", 1)).toBe("#ffffff");
  });

  it("returns the midpoint at t=0.5", () => {
    expect(blendHex("#000000", "#ffffff", 0.5)).toBe("#808080");
  });

  it("blends each channel independently", () => {
    expect(blendHex("#ff0000", "#0000ff", 0.5)).toBe("#800080");
  });
});

describe("darkenHex", () => {
  it("darkens by the default factor of 0.6", () => {
    expect(darkenHex("#ffffff")).toBe("#999999");
  });

  it("respects an explicit factor", () => {
    expect(darkenHex("#ffffff", 0.5)).toBe("#808080");
    expect(darkenHex("#ffffff", 1)).toBe("#ffffff");
  });

  it("leaves black unchanged", () => {
    expect(darkenHex("#000000", 0.6)).toBe("#000000");
  });
});
