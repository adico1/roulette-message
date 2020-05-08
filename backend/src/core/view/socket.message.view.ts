import { ISocketMessage } from "./socket-message.interface";
import { InMessageResponse } from "../../modules/roulette-notifier/in-message/response";

export class SocketMessageView implements ISocketMessage {
  io: any;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  render(response: InMessageResponse) {
    console.log(`[server][SocketMessageView][render][spin]`, response.recipients[0], response.content);
      
    this.io.to(response.recipients[0]).emit('message', response.content);
  }
}