import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"

@WebSocketGateway()
export class GatewayController implements OnModuleInit {

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on("connection", socket => {
            console.log(`Connected ${socket.id}`);
        })
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() body: any) {
        console.log(body);   
    }
}