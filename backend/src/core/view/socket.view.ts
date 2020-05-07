export interface IView {
  render(response: any): void
}
export class SocketView implements IView {
  io: any;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  render(response: any): void {
    console.log(`[server][SocketView]render:`, JSON.stringify(response));
    this.io.emit("message", JSON.stringify(response));
  }
}