import { App, Configuration, MidwayFrameworkType } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { Application as SocketApplication } from '@midwayjs/socketio';
import { join } from 'path';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [orm],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @App(MidwayFrameworkType.WS_IO)
  socketApp: SocketApplication;

  async onReady() {
    console.log('in', this.socketApp)
    // this.socketApp.on('connection', socket => {
    //   console.log('connection',socket.id);
    // });
  }
}
