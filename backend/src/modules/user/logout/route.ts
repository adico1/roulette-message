import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { LogoutClientDto } from "../../../types";
import { LogoutRequest } from "./request";
import { LogoutResponse } from "./response";
import { logoutController } from "./logic.barrel";
import { connectedSockets } from "../../../ConnectedSockets";

export class LogoutRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: string|LogoutClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));
  
        if( !connectedSockets.isLoggedIn(socketId) ) {
          return;
        }
        
        let m: LogoutClientDto = this.argumentToDtoMapper<LogoutClientDto>(s_m);
        
        const logoutRequest = {
          ...m,
          socketId: socketId,
          nodeId: nodeId
        } as LogoutRequest;

        this.execute<LogoutRequest, LogoutResponse>(logoutController, logoutRequest)
      }
    }
  }
}