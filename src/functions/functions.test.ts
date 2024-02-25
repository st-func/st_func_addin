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
  const testCases: [string, number][] = [
    ["A", 41850.0],
    ["ZY", 15520364.5833333],
    ["ZZ", 1336619.9375],
    ["m", 328.5225],
    ["iY", 471.714095162177],
    ["iZ", 79.9229000487988],
    ["IY", 9312218750.0],
    ["IZ", 267323987.5],
  ];
  verifySecProperty(testCases, (propertyTypes: string[][]) => secBuildH(propertyTypes, 1200, 400, 19, 25));
});

test("secFlatBar", () => {
  const testCases: [string, number][] = [
    ["A", 1.9e3],
    ["ZY", 3.16666666666667e4],
    ["ZZ", 6.01666666666667e3],
    ["m", 1.4915e1],
    ["iY", 2.88675134594813e1],
    ["iZ", 5.48482755730145],
    ["IY", 1.58333333333333e6],
    ["IZ", 5.71583333333333e4],
  ];
  verifySecProperty(testCases, (propertyTypes: string[][]) => secFlatBar(propertyTypes, 100, 19));
});

test("secPipe", () => {
  const testCases: [string, number][] = [
    ["A", 1.41088926072718e4],
    ["ZY", 1.72946416752188e6],
    ["ZZ", 1.72946416752188e6],
    ["m", 1.10754806967083e2],
    ["iY", 1.76451834787854e2],
    ["iZ", 1.76451834787854e2],
    ["IY", 4.39283898550558e8],
    ["IZ", 4.39283898550558e8],
  ];
  verifySecProperty(testCases, (propertyTypes: string[][]) => secPipe(propertyTypes, 508, 9));
});

test("secRoundBar", () => {
  const testCases: [string, number][] = [
    ["A", 8.04247719318987e2],
    ["ZY", 3.21699087727595e3],
    ["ZZ", 3.21699087727595e3],
    ["m", 6.31334459665405],
    ["iY", 8.0],
    ["iZ", 8.0],
    ["IY", 5.14718540364152e4],
    ["IZ", 5.14718540364152e4],
  ];
  verifySecProperty(testCases, (propertyTypes: string[][]) => secRoundBar(propertyTypes, 32));
});
