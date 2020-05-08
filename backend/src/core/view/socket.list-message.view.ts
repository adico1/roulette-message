import { ISocketMessage } from "./socket-message.interface";
import { InMessageResponse } from "../../modules/roulette-notifier/in-message/response";

export class SocketListMessageView implements ISocketMessage {
  io: any;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  render(response: InMessageResponse) {
    (response.recipients as string[]).forEach(socketId => {
      this.io.to(socketId).emit('message', response.content);
    })
  }
}