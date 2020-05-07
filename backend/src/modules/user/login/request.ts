import { IAuthBase } from "../../../core/abstract/auth-base.interface";
import { ConnectedSocket } from "../../../ConnectedSocket";

export interface LoginRequest extends IAuthBase {
  userId: number;
  nodeId: number;
  socketId: string;
}