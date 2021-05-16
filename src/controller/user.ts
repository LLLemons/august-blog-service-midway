/*
 * @Author: Lemon
 * @Date: 2021-05-14 17:42:21
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 14:50:54
 * @FilePath: /august-blog-service-midway/src/controller/user.ts
 */

import { ALL, Body, Controller, Get, Inject, Post, Provide, Put, SetHeader, Validate } from "@midwayjs/decorator";
import { UserLoginDTO, UserRegisterDTO, UserUpdateDTO } from "../dto/user";
import { UserService } from "../service/user";
import { Context } from 'egg'

@Provide()
@Controller('/api/v1/user')
export class UserController {

  @Inject() userService: UserService

  @Inject() ctx: Context
  
  @Validate()
  @Post('/register') async register(@Body(ALL) userProps: UserRegisterDTO) {
    return await this.userService.register(userProps)
  }

  @Validate()
  @Post('/login') async login(@Body(ALL) userProps: UserLoginDTO) {
    const token =  await this.userService.login(userProps)
    this.ctx.set('access-token', token);
    return '登陆成功'
  }

  @Get('/info', { middleware: ['jwtMiddleware'] }) async getUserInfo() {
    return this.userService.getUserInfo()
  }

  @Validate()
  @Put('/info', { middleware: ['jwtMiddleware'] }) async updateUserInfo(@Body(ALL) userProps: UserUpdateDTO) {
    return this.userService.update(userProps)
  }
}