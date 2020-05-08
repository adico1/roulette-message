export class RoulettePlayerEntity {
  user_id: number;
  node_id: number;
  socket_id: string;

  constructor(userId: number, nodeId: number, socketId: string) {
    this.user_id = userId;
    this.node_id = nodeId;
    this.socket_id = socketId;
  }

  static create(userId: number, nodeId: number, socketId: string): RoulettePlayerEntity {
    return new RoulettePlayerEntity(userId, nodeId, socketId);
  }
}