import { secBuildBox, secBuildH } from "./functions";

test("Build-BOX", () => {
  expect(secBuildBox("A", 1000, 800, 19, 25)).toBeCloseTo(76100.0, 9);
  expect(secBuildBox("ZY", 1000, 800, 19, 25)).toBeCloseTo(24446708.3333333, 7);
  expect(secBuildBox("ZZ", 1000, 800, 19, 25)).toBeCloseTo(19098293.4166667, 7);
  expect(secBuildBox("m", 1000, 800, 19, 25)).toBeCloseTo(597.385, 12);
  expect(secBuildBox("iY", 1000, 800, 19, 25)).toBeCloseTo(400.777073164208, 12);
  expect(secBuildBox("iZ", 1000, 800, 19, 25)).toBeCloseTo(316.836310923171, 12);
  expect(secBuildBox("IY", 1000, 800, 19, 25)).toBeCloseTo(12223354166.6667, 4);
  expect(secBuildBox("IZ", 1000, 800, 19, 25)).toBeCloseTo(7639317366.66666, 4);
});

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
