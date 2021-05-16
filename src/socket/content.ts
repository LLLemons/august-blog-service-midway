import {
  WSController,
  OnWSMessage,
  Provide,
  OnWSConnection,
  Inject,
  WSEmit,
} from '@midwayjs/decorator';
import { SocketRequestEvent, SocketResponseEvent } from '../interface';
import { Context } from '@midwayjs/socketio';
import { verifyToken } from '../lib/token';
import { getTitle } from '../lib/common';
import { ArticleService } from '../service/article';

@Provide()
@WSController('/content')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @Inject() articleService: ArticleService

  @OnWSConnection()
  async onConnectionMethod() {
    
    console.log('on client connect content',this.ctx.handshake.auth, this.ctx.id);
    const authToken = this.ctx.handshake.auth.token
    if (authToken) {
      const res: any = verifyToken(authToken.substring(7)) // 解密获取的Token
      if (res.id) {
      } else {
        this.ctx.emit(SocketResponseEvent.SAVE, {
          success: false,
          content: 'token已经失效'
        })
        this.ctx.disconnect()
      }
    } else {
      this.ctx.emit(SocketResponseEvent.SAVE, {
        success: false,
        content: 'token已经失效'
      })
      this.ctx.disconnect()
    }
  }

  @OnWSMessage(SocketRequestEvent.SAVE)
  @WSEmit(SocketResponseEvent.SAVE)
  async gotMessage(content: string) {
    console.log(content, this.ctx.handshake.query)
    console.log(getTitle(content))
    const article = await this.articleService.save({
      title: getTitle(content),
      content,
      aId: this.ctx.handshake.query.aId,
      rId: this.ctx.handshake.query.rId
    })
    console.log(article, 'article')
    return {
      success: true,
      article
    }
  }
}
