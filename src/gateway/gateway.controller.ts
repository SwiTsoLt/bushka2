import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayService, IMessage } from './gateway.service';

@WebSocketGateway()
export class GatewayController implements OnModuleInit {
  constructor(private gatewayService: GatewayService) {}

  @WebSocketServer()
  private server: Server;

  public onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected ${socket.id}`);
      const messageList: IMessage[] = this.gatewayService.getAll();
      socket.emit('allMessages', messageList);
    });
  }

  @SubscribeMessage('newMessage')
  public newMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IMessage,
  ) {
    this.gatewayService.newMessage(message);
    socket.broadcast.emit('newMessage', message);
  }
}
