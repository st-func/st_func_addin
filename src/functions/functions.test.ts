import { secBuildH } from "./functions";

test("ビルドH", () => {
  expect(secBuildH("A", 1200, 400, 19, 25)).toBe(41850.0);
  expect(secBuildH("ZY", 1200, 400, 19, 25)).toBeCloseTo(15520364.5833333, 7);
  expect(secBuildH("ZZ", 1200, 400, 19, 25)).toBeCloseTo(1336619.9375, 8);
  expect(secBuildH("m", 1200, 400, 19, 25)).toBe(328.5225);
  expect(secBuildH("iY", 1200, 400, 19, 25)).toBeCloseTo(471.714095162177, 12);
  expect(secBuildH("iZ", 1200, 400, 19, 25)).toBeCloseTo(79.9229000487988, 13);
  expect(secBuildH("IY", 1200, 400, 19, 25)).toBeCloseTo(9312218750.0, 5);
  expect(secBuildH("IZ", 1200, 400, 19, 25)).toBeCloseTo(267323987.5, 6);
});
