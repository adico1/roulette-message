import { LogoutRequest } from "./request";
import { LogoutResponse } from "./response";
import { roulettePlayerRepo } from "../../../data/repos";
import { connectedSockets } from "../../../ConnectedSockets";

export class LogoutUseCase {
  async exec(request: LogoutRequest): Promise<LogoutResponse> {
    const cs = connectedSockets.get(request.socketId);
    const res = await roulettePlayerRepo
      .deleteById(
        cs.userId, 
        request.nodeId, 
        cs.socketId);
    
    connectedSockets.logout(cs.socketId);

    return {status: 200, message: 'OK'} as LogoutResponse;
  }
}