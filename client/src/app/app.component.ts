import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Observable, of } from 'rxjs';

interface IMessage {
  name: string,
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  public messageList: Observable<IMessage[]> = of([])

  public send(name: string, text: string) {
    this.webSocketService.emit('newMessage', { name, text });

    this.messageList.subscribe((cur: IMessage[]) => {
      this.messageList = of([...cur, {name, text}])
    })
  }

  ngOnInit(): void {
    this.webSocketService.listen('allMessages').subscribe((allMessages: IMessage[]) => {
      this.messageList = of(allMessages)
    })

    this.webSocketService.listen('newMessage').subscribe((message: IMessage) => {
      this.messageList.subscribe((cur: IMessage[]) => {
        this.messageList = of([...cur, message])
      })
    });
  }
}
