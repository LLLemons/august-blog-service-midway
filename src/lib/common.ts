/*
 * @Author: Lemon
 * @Date: 2021-05-16 01:05:10
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 02:48:03
 * @FilePath: /august-blog-service-midway/src/lib/common.ts
 */

export const getTitle = (str: string) => {
  if (!str) {
    return ''
  }
  let _str = str;
  _str = _str.replace(/\<[^>]*\>(([^<])*)/g, function () {
    let mark = '';
    return arguments[1];
  });
  _str = _str.substring(0, str.length - 1);
  return _str
};
