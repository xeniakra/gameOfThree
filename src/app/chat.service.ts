import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://gamethreeso.herokuapp.com";

export interface Message {
  author: number;
  recipient: number;
  message: any;
  type: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message,
          type: data.type,
          recipient: data.recipient
        };
        return response.data;
      }
    ));
  }
}