import { ConnectedSocket } from "./ConnectedSocket";

type ConnectedSocketMap = {[key:string]: ConnectedSocket };

class ConnectedSockets {
  connectedSockets: ConnectedSocketMap = {};

  add(socket: any) {
    this.connectedSockets[socket.id] = new ConnectedSocket(socket);
  }

  get(socketId: string) {
    return this.connectedSockets[socketId];
  }

  remove(socket: any) {
    delete this.connectedSockets[socket.id];
  }

  login(socket: any, userId: number) {
    this.connectedSockets[socket.id].userId = userId;
  }

  isLoggedIn(socketId: string) {
    console.log(`[server][ConnectedSockets]connectedSockets:`, JSON.stringify(this.connectedSockets));
    if (socketId in this.connectedSockets) {
      return !!this.connectedSockets[socketId].userId
    }
    return false;
  }

  logout(socketId: string) {
    this.connectedSockets[socketId].userId = undefined;
  }

  disconnect(socket: any) {
    if (this.isLoggedIn(socket.id)) {
      this.logout(socket);
    }
    delete this.connectedSockets[socket.id];
  }
}

const connectedSockets = new ConnectedSockets();

export {
  connectedSockets
}