/*
 * @Author: Lemon
 * @Date: 2021-05-15 14:38:18
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 14:50:18
 * @FilePath: /august-blog-service-midway/src/middleware/jwt.ts
 */

import { Provide } from "@midwayjs/decorator";
import { IMidwayWebNext, IWebMiddleware } from "@midwayjs/web";
import { Context } from 'egg'
import { verifyToken } from "../lib/token";


@Provide()
export class JWTMiddleware implements IWebMiddleware {
  resolve() {
    return async(ctx: Context, next: IMidwayWebNext) => {
      let authToken = ctx.header.authorization as string // 获取header里的authorization
      if (authToken) {
        authToken = authToken.substring(7)
        const res: any = verifyToken(authToken) // 解密获取的Token
        if (res.id) {
          await next()
        } else {
          ctx.status = 401
          ctx.body = { message: '登录状态已过期' }
        }
      } else {
        ctx.status = 401
        ctx.body = { message: '请登陆后再进行操作' }
      }
    }
  }
}