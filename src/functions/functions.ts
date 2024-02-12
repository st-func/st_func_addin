import { SectionPropertyType, SecBuildHFunction, Unit } from "@st-func/st-func-ts";
/**
 * 文字列をenumのpropertyTypeに変換する
 * @param propertyType 文字列の断面性能タイプ
 * @returns enumの断面性能タイプ
 */
function toSectionPropertyType(propertyType: string): SectionPropertyType {
  switch (propertyType) {
    case "A":
      return SectionPropertyType.Area;
    case "m":
      return SectionPropertyType.MassPerMetre;
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

function unitOfSectionPropertyType(propertyType: SectionPropertyType): string {
  switch (propertyType) {
    case SectionPropertyType.Area:
      return "mm^2";
    case SectionPropertyType.SecondMomentOfAreaY:
    case SectionPropertyType.SecondMomentOfAreaZ:
      return "mm^4";
    case SectionPropertyType.MassPerMetre:
      return "kg/m";
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
  let propertyTypeEnum = toSectionPropertyType(propertyType);
  let value = SecBuildHFunction.buildH(
    propertyTypeEnum,
    Unit.input(a, "mm"),
    Unit.input(b, "mm"),
    Unit.input(t1, "mm"),
    Unit.input(t2, "mm")
  );
  return Unit.output(value, unitOfSectionPropertyType(propertyTypeEnum));
}
