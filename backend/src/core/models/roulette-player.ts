import { User } from "./user";

export class RoulettePlayer {
  userId: number;
  nodeId: number;
  socketId: string;
  playerId: string;

  constructor(userId: number, nodeId: number, socketId: string, playerId: string) {
    this.userId = userId;
    this.nodeId = nodeId;
    this.socketId = socketId;
    this.playerId == playerId;
  }

  static create(user: User, nodeId: number, socketId: string): RoulettePlayer {
    return new RoulettePlayer(user.userId, nodeId, socketId, null);
  }
}