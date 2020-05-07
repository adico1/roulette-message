export class ConnectedSocket {
  socketId: string;
  userId: number;

  constructor(socket: any) {
    this.socketId = socket.id;
  } 
}