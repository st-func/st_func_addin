import { secBuildBox, secBuildH, secFlatBar, secPipe, secRoundBar } from "./functions";

/**
 * expect().toBeCloseToを実行する際のnumDigitsを算定する関数
 * @param expected expect().toBecloseToの引数で指定するexpected
 * @returns expect().toBecloseToの引数で指定するnumdigits
 */
function numDigits(expected: number): number {
  return -Math.ceil(Math.log10(expected)) + 13;
}

/**
 * 配列対応の断面性能関数に対して、1x1配列、縦に並べた配列、横に並べた配列に対してテストを行う
 * @param testCases 断面性能タイプと想定される断面性能の結果の値のリスト
 * @param secPropertyFunction 断面性能タイプから断面性能を算出する関数
 */
function verifySecProperty(
  testCases: [string, number][],
  secPropertyFunction: (propertyTypes: string[][]) => number[][]
) {
  testCases.forEach(([input, expected]) => {
    expect(secPropertyFunction([[input]])[0][0]).toBeCloseTo(expected, numDigits(expected));
  });

  const parameterTypesV = testCases.map(([input]) => [input]);
  const resultsV = secPropertyFunction(parameterTypesV);
  testCases.forEach(([input, expected], i) => {
    expect(resultsV[i][0]).toBeCloseTo(expected, numDigits(expected));
  });

  const parameterTypesH = [testCases.map(([input]) => input)];
  const resultsH = secPropertyFunction(parameterTypesH);
  testCases.forEach(([input, expected], i) => {
    expect(resultsH[0][i]).toBeCloseTo(expected, numDigits(expected));
  });
}

test("SecBuildBox", () => {
  const testCases: [string, number][] = [
    ["A", 76100.0],
    ["ZY", 24446708.3333333],
    ["ZZ", 19098293.4166667],
    ["m", 597.385],
    ["iY", 400.777073164208],
    ["iZ", 316.836310923171],
    ["IY", 12223354166.6667],
    ["IZ", 7639317366.66666],
  ];
  verifySecProperty(testCases, (propertyTypes: string[][]) => secBuildBox(propertyTypes, 1000, 800, 19, 25));
});

test("SecBuildH", () => {
  expect(secBuildH("A", 1200, 400, 19, 25)).toBe(41850.0);
  expect(secBuildH("ZY", 1200, 400, 19, 25)).toBeCloseTo(15520364.5833333, 7);
  expect(secBuildH("ZZ", 1200, 400, 19, 25)).toBeCloseTo(1336619.9375, 8);
  expect(secBuildH("m", 1200, 400, 19, 25)).toBe(328.5225);
  expect(secBuildH("iY", 1200, 400, 19, 25)).toBeCloseTo(471.714095162177, 12);
  expect(secBuildH("iZ", 1200, 400, 19, 25)).toBeCloseTo(79.9229000487988, 13);
  expect(secBuildH("IY", 1200, 400, 19, 25)).toBeCloseTo(9312218750.0, 5);
  expect(secBuildH("IZ", 1200, 400, 19, 25)).toBeCloseTo(267323987.5, 6);
});

test("secFlatBar", () => {
  expect(secFlatBar("A", 100, 19)).toBeCloseTo(1.9e3, 9);
  expect(secFlatBar("ZY", 100, 19)).toBeCloseTo(3.16666666666667e4, 8);
  expect(secFlatBar("ZZ", 100, 19)).toBeCloseTo(6.01666666666667e3, 9);
  expect(secFlatBar("m", 100, 19)).toBeCloseTo(1.4915e1, 11);
  expect(secFlatBar("iY", 100, 19)).toBeCloseTo(2.88675134594813e1, 11);
  expect(secFlatBar("iZ", 100, 19)).toBeCloseTo(5.48482755730145, 12);
  expect(secFlatBar("IY", 100, 19)).toBeCloseTo(1.58333333333333e6, 6);
  expect(secFlatBar("IZ", 100, 19)).toBeCloseTo(5.71583333333333e4, 8);
});

test("secPipe", () => {
  expect(secPipe("A", 508, 9)).toBeCloseTo(1.41088926072718e4, 8);
  expect(secPipe("ZY", 508, 9)).toBeCloseTo(1.72946416752188e6, 6);
  expect(secPipe("ZZ", 508, 9)).toBeCloseTo(1.72946416752188e6, 6);
  expect(secPipe("m", 508, 9)).toBeCloseTo(1.10754806967083e2, 10);
  expect(secPipe("iY", 508, 9)).toBeCloseTo(1.76451834787854e2, 10);
  expect(secPipe("iZ", 508, 9)).toBeCloseTo(1.76451834787854e2, 10);
  expect(secPipe("IY", 508, 9)).toBeCloseTo(4.39283898550558e8, 4);
  expect(secPipe("IZ", 508, 9)).toBeCloseTo(4.39283898550558e8, 4);
});

test("secRoundBar", () => {
  expect(secRoundBar("A", 32)).toBeCloseTo(8.04247719318987e2, 10);
  expect(secRoundBar("ZY", 32)).toBeCloseTo(3.21699087727595e3, 9);
  expect(secRoundBar("ZZ", 32)).toBeCloseTo(3.21699087727595e3, 9);
  expect(secRoundBar("m", 32)).toBeCloseTo(6.31334459665405, 12);
  expect(secRoundBar("iY", 32)).toBeCloseTo(8.0, 12);
  expect(secRoundBar("iZ", 32)).toBeCloseTo(8.0, 12);
  expect(secRoundBar("IY", 32)).toBeCloseTo(5.14718540364152e4, 8);
  expect(secRoundBar("IZ", 32)).toBeCloseTo(5.14718540364152e4, 8);
});
