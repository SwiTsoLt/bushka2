import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly uri: string = 'ws://localhost:3000';
  private socket: io.Socket;

  constructor() {
    this.socket = io.connect(this.uri);
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
