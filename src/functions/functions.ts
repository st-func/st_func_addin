﻿/* global clearInterval, console, CustomFunctions, setInterval */

/**
 * 配列同士を加算する
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function addArrayTest(first: number[][], second: number[][]): number[][] {
  let result:number[][]=[];
  for(let i=0;i<first.length;i++){
    result.push([first[i][0]+second[i][0]]);
  }
  return result;
}
/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second;
}

/**
 * 2数の掛け算を実行する
 * @customfunction
 * @param first かけられる数
 * @param second かける数
 * @returns 掛け算した結果
 */
export function test_times(first: number, second: number): number {
  return first * second;
}

/**
 * 文字列を結合する
 * @customfunction
 * @param first 前の文字列
 * @param second 後ろ文字列
 * @returns 連結した文字列
 */
export function test_add_string(first: string, second: string): string {
  return first +"+"+ second;
}



/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}
