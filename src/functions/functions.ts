import { SectionPropertyType, SecBuildHFunction } from "@st-func/st-func-ts";
/**
 * 文字列をenumのpropertyTypeに変換する
 * @param propertyType 文字列の断面性能タイプ
 * @returns enumの断面性能タイプ
 */
function ToSectionPropertyType(propertyType: string): SectionPropertyType {
  switch (propertyType) {
    case "A":
      return SectionPropertyType.Area;
    case "Iy":
      return SectionPropertyType.SecondMomentOfAreaY;
    case "Iz":
      return SectionPropertyType.SecondMomentOfAreaZ;
    default:
      let error = new CustomFunctions.Error(
        CustomFunctions.ErrorCode.invalidValue,
        `[${propertyType}]は正しくないタイプ名です`
      );
      throw error;
  }
}

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
  return SecBuildHFunction.build_h(ToSectionPropertyType(propertyType), a, b, t1, t2);
}
