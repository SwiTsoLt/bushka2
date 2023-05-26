import { Injectable } from "@nestjs/common";

export interface IMessage {
    name: string,
    text: string
}

@Injectable()
export class GatewayService {

    private messageList: IMessage[] = []
  
    public getAll(): IMessage[] {
        return this.messageList
    }

    public newMessage(message: IMessage): void {
        this.messageList.push(message)
    }
}