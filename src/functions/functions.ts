import {
  SecBuildBox,
  SecBuildH,
  SecFlatBar,
  SecPipe,
  SecPropertyType,
  SecRoundBar,
  SecSteel,
  Unit,
} from "@st-func/st-func-ts";
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

/**
 * 断面性能タイプの単位
 * @param propertyType 断面性能タイプ
 * @returns 単位
 */
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
 * 鉄骨断面の断面性能
 * @param propertyType 表示したい断面性能のタイプ
 * @param section SecSteelを継承した鉄骨断面クラスのインスタンス
 * @returns 断面性能
 */
function getSecSteelProperty(propertyType: string, section: SecSteel): number {
  const propertyTypeEnum = toSecPropertyType(propertyType);
  const value = section.property(propertyTypeEnum);
  return Unit.output(value, unitOfSecProperty(propertyTypeEnum));
}

/**
 *  組立角形鋼管の断面性能。
 * @customfunction secBuildBox secBuildBox
 * @param propertyType 表示したい断面性能のタイプ
 * @param a 成 A
 * @param b 幅 B
 * @param t1 成方向の板厚 t1
 * @param t2 幅方向の板厚 t2
 * @returns 断面性能
 */
export function secBuildBox(propertyType: string, a: number, b: number, t1: number, t2: number): number {
  const secBuildBox: SecBuildBox = new SecBuildBox();
  secBuildBox.setDimensions(Unit.input(a, "mm"), Unit.input(b, "mm"), Unit.input(t1, "mm"), Unit.input(t2, "mm"));
  return getSecSteelProperty(propertyType, secBuildBox);
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
  const secBuildH: SecBuildH = new SecBuildH();
  secBuildH.setDimensions(Unit.input(a, "mm"), Unit.input(b, "mm"), Unit.input(t1, "mm"), Unit.input(t2, "mm"));
  return getSecSteelProperty(propertyType, secBuildH);
}

/**
 *  平鋼の断面性能
 * @customfunction secFlatBar secFlatBar
 * @param propertyType 表示したい断面性能のタイプ
 * @param b 幅 B
 * @param t 板厚 t
 * @returns 断面性能
 */
export function secFlatBar(propertyType: string, b: number, t: number): number {
  const secFlatBar: SecFlatBar = new SecFlatBar();
  secFlatBar.setDimensions(Unit.input(b, "mm"), Unit.input(t, "mm"));
  return getSecSteelProperty(propertyType, secFlatBar);
}

/**
 *  円形鋼管の断面性能
 * @customfunction secPipe secPipe
 * @param propertyType 表示したい断面性能のタイプ
 * @param d 直径 D
 * @param t 板厚 t
 * @returns 断面性能
 */
export function secPipe(propertyType: string, d: number, t: number): number {
  const secPipe: SecPipe = new SecPipe();
  secPipe.setDimensions(Unit.input(d, "mm"), Unit.input(t, "mm"));
  return getSecSteelProperty(propertyType, secPipe);
}

/**
 *  丸鋼の断面性能
 * @customfunction secRoundBar secRoundBar
 * @param propertyType 表示したい断面性能のタイプ
 * @param r 直径 R
 * @returns 断面性能
 */
export function secRoundBar(propertyType: string, r: number): number {
  const secRoundBar: SecRoundBar = new SecRoundBar();
  secRoundBar.setDimensions(Unit.input(r, "mm"));
  return getSecSteelProperty(propertyType, secRoundBar);
}
