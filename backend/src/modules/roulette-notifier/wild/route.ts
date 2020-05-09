import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { WildClientDto } from "../../../types";
import { WildRequest } from "./request";
import { WildResponse } from "./response";
import { wildController } from "./logic.barrel";

export class WildRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: WildClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));
  
        if (this.notAuthorized(socketId)) {
          return;
        }
        
        let m: WildClientDto = this.argumentToDtoMapper<WildClientDto>(s_m);
        const wildRequest = m as WildRequest;

        this.execute<WildRequest, WildResponse>(wildController, wildRequest)
      }
    }
  }
}