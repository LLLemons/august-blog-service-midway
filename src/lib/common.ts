/*
 * @Author: Lemon
 * @Date: 2021-05-16 01:05:10
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 19:17:57
 * @FilePath: /august-blog-service-midway/src/lib/common.ts
 */

export const getTitle = (str: string) => {
  if (!str) {
    return ''
  }
  const isMatch = str.match(/(<h[1-6][^>]*>)([^><]+)(<\/h[1-6]>)/)
  if (!isMatch) {
    return ''
  }
  return isMatch[2]
};
