import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly uri: string = "";
  private socket: io.Socket;

  constructor() {
    this.socket = io.connect(this.uri);

    const origin = window.location.href
      .split("//")[1]
      .split(":")[0]
      .split("/")[0];
    this.uri = window.location.href.includes("https")
      ? `wss://${origin}`
      : `ws://${origin}:3000`;
  }

  public listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, { msg: data });
  }
}
