import { SecBuildHFunction } from "@st-func/st-func-ts";
/**
 *  組立H形鋼の断面性能。
 * @customfunction secBuildH secBuildH
 * @param propertyType 表示したい断面性能のタイプ
 * @param a 成 A
 * @param b フランジ幅 B
 * @param t1 ウェブ厚 t1
 * @param t2 フランジ厚 t2
 * @returns 断面性能
 */
export function secBuildH(propertyType: string, a: number, b: number, t1: number, t2: number): number {
  switch (propertyType) {
    case "A":
      return SecBuildHFunction.build_h_area(a, b, t1, t2);
    case "Iy":
      return SecBuildHFunction.build_h_second_moment_of_area_y(a, b, t1, t2);
    case "Iz":
      return SecBuildHFunction.build_h_second_moment_of_area_z(a, b, t1, t2);
    default: {
      let error = new CustomFunctions.Error(
        CustomFunctions.ErrorCode.invalidValue,
        `[${propertyType}]は正しくないタイプ名です`
      );
      throw error;
    }
  }
}
