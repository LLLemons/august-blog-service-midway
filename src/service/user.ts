import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserLoginProps, UserRegisterProps, UserUpdateProps } from '../interface';
import { Context } from 'egg'
import { loginToken, verifyToken } from '../lib/token';
import { UserUpdateDTO } from '../dto/user';
const bcrypt = require('bcryptjs')

@Provide()
export class UserService {

  @InjectEntityModel(User) userModel: Repository<User>;

  @Inject()
  ctx: Context

  async register(userProps: UserRegisterProps) {
    var salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userProps.password, salt);
    const userInfo = await this.userModel.findOne({ email: userProps.email })
    if (userInfo) {
      this.ctx.throw(500, '用户已存在')
    }
    const user = new User()
    user.email = userProps.email
    user.avatar = userProps.avatar
    user.password = hash
    return this.userModel.save(user)
  }

  async login(userProps: UserLoginProps) {
    const userInfo = await this.userModel.findOne({ where: { email: userProps.email }, select: ['id', 'email', 'avatar', 'password'] })
    if (!userInfo) {
      this.ctx.throw(500, '用户不存在')
    }
    if (userInfo && !bcrypt.compareSync(userProps.password, userInfo.password)) {
      this.ctx.throw(500, '密码错误')
    }
    const Authorization = loginToken(userInfo)
    return Authorization
  }

  async getUserInfo() {
    const authToken = this.ctx.header.authorization
    const userInfo = verifyToken(authToken.substring(7))
    return this.userModel.findOne({
      id: userInfo.id,
    })
  }
  async update(userInfoProps: UserUpdateProps) {
    const authToken = this.ctx.header.authorization
    const userInfo = verifyToken(authToken)
    const user = await this.userModel.findOne({ id: userInfo.id })
    if (userInfoProps.password) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(userInfoProps.password, salt);
      user.password = hash
    }
    if (userInfoProps.avatar) {
      user.avatar = userInfoProps.avatar
    }
    return this.userModel.save(user)
  }
}
