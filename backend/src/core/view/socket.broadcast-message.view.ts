import { InMessageResponse } from "../../modules/roulette-notifier/in-message/response";
import { ISocketMessage } from "./socket-message.interface";

export class SocketMessageBroadcastView implements ISocketMessage {
  io: any;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  render(response: InMessageResponse): void {
    console.log(`[server][SocketView][Blast]render:`, JSON.stringify(response));
    this.io.emit('message', response.content);
  }
}