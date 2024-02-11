import { SectionPropertyType, SecBuildHFunction, Unit } from "@st-func/st-func-ts";
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

function UnitOfSectionPropertyType(propertyType: SectionPropertyType): string {
  switch (propertyType) {
    case SectionPropertyType.Area:
      return "mm^2";
    case SectionPropertyType.SecondMomentOfAreaY:
    case SectionPropertyType.SecondMomentOfAreaZ:
      return "mm^4";
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
  let propertyTypeEnum = ToSectionPropertyType(propertyType);
  let value = SecBuildHFunction.build_h(
    propertyTypeEnum,
    Unit.in(a, "mm"),
    Unit.in(b, "mm"),
    Unit.in(t1, "mm"),
    Unit.in(t2, "mm")
  );
  return Unit.out(value, UnitOfSectionPropertyType(propertyTypeEnum));
}
