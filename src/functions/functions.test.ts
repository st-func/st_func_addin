import { secBuildH } from "./functions";

test("ビルドH", () => {
  expect(secBuildH("A", 1200, 400, 19, 25)).toBe(41850.0);
  expect(secBuildH("Iy", 1200, 400, 19, 25)).toBe(9312218750.0);
  expect(secBuildH("Iz", 1200, 400, 19, 25)).toBe(267323987.5);
});
