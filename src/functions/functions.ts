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
export function secBuildH(propertyType:string, a:number, b:number, t1:number, t2:number):number{
  const a_in:number=a-2*t2;
  const b_in:number=b-t1;
  switch(propertyType){
    case 'A':
      return b*a-b_in*a_in;
    case 'Iy':
      return (b*a**3-b_in*a_in**3)/12.0;
    case 'Iz':
      return (t2*2*b**3+a_in*t1**3)/12.0;
    default:
      let error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, `[${propertyType}]は正しくないタイプ名です`);
      throw error;
  }
}