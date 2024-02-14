import { SecPropertyType, SecBuildH, Unit } from "@st-func/st-func-ts";
/**
 * 文字列をenumのpropertyTypeに変換する
 * @param propertyType 文字列の断面性能タイプ
 * @returns enumの断面性能タイプ
 */
function toSecPropertyType(propertyType: string): SecPropertyType {
  switch (propertyType) {
    case "A":
      return SecPropertyType.Area;
    case "ZY":
      return SecPropertyType.ElasticModulusY;
    case "ZZ":
      return SecPropertyType.ElasticModulusZ;
    case "m":
      return SecPropertyType.MassPerMetre;
    case "iY":
      return SecPropertyType.RadiusOfGyrationY;
    case "iZ":
      return SecPropertyType.RadiusOfGyrationZ;
    case "IY":
      return SecPropertyType.SecondMomentOfAreaY;
    case "IZ":
      return SecPropertyType.SecondMomentOfAreaZ;
    default:
      let error = new CustomFunctions.Error(
        CustomFunctions.ErrorCode.invalidValue,
        `[${propertyType}]は正しくないタイプ名です`
      );
      throw error;
  }
}

function unitOfSecProperty(propertyType: SecPropertyType): string {
  switch (propertyType) {
    case SecPropertyType.RadiusOfGyrationY:
    case SecPropertyType.RadiusOfGyrationZ:
      return "mm";
    case SecPropertyType.Area:
      return "mm^2";
    case SecPropertyType.ElasticModulusY:
    case SecPropertyType.ElasticModulusZ:
      return "mm^3";
    case SecPropertyType.SecondMomentOfAreaY:
    case SecPropertyType.SecondMomentOfAreaZ:
      return "mm^4";
    case SecPropertyType.MassPerMetre:
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
  let propertyTypeEnum = toSecPropertyType(propertyType);
  let value = SecBuildH.property(
    propertyTypeEnum,
    Unit.input(a, "mm"),
    Unit.input(b, "mm"),
    Unit.input(t1, "mm"),
    Unit.input(t2, "mm")
  );
  return Unit.output(value, unitOfSecProperty(propertyTypeEnum));
}
