import { SocketMessageBroadcastView } from "./socket.broadcast-message.view";
import { SocketMessageView } from "./socket.message.view";
import { SocketListMessageView } from "./socket.list-message.view";
import { IView } from "./socket.response.view";

export class MessagingFactory {
  io: SocketIO.Server;

  constructor(io: SocketIO.Server) {
    this.io = io;  
  }

  create(type: string[] | '*'): IView {
    if( type === '*' ) {
      return new SocketMessageBroadcastView(this.io);
    }

    if( type.length === 1 ) {
      return new SocketMessageView(this.io);
    }

    return new SocketListMessageView(this.io);
  }
}