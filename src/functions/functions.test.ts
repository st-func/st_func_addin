import { secBuildH } from "./functions";

test("ビルドH", () => {
  expect(secBuildH("A", 1200, 400, 19, 25)).toBe(41850.0);
  expect(secBuildH("m", 1200, 400, 19, 25)).toBe(328.5225);
  expect(secBuildH("Iy", 1200, 400, 19, 25)).toBeCloseTo(9312218750.0, 5);
  expect(secBuildH("Iz", 1200, 400, 19, 25)).toBeCloseTo(267323987.5, 6);
});
