import { User } from "./user";

export class RoulettePlayer {
  userId: number;
  nodeId: number;
  socketId: string;

  constructor(userId: number, nodeId: number, socketId: string) {
    this.userId = userId;
    this.nodeId = nodeId;
    this.socketId = socketId;
  }

  static create(user: User, nodeId: number, socketId: string): RoulettePlayer {
    return new RoulettePlayer(user.userId, nodeId, socketId);
  }
}