import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  public message: string = '';

  public send() {
    console.log(this.message);
    this.webSocketService.emit('events', this.message);
  }

  ngOnInit(): void {
    this.webSocketService.listen('events').subscribe(console.log);
  }
}
