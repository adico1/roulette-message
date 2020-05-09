import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { SpinClientDto } from "../../../types";
import { SpinRequest } from "./request";
import { SpinResponse } from "./response";
import { spinController } from "./logic.barrel";

export class SpinRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: SpinClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));

        if (this.notAuthorized(socketId)) {
          return;
        }
        
        let m: SpinClientDto = this.argumentToDtoMapper<SpinClientDto>(s_m);
        const spinRequest = m as SpinRequest;

        this.execute<SpinRequest, SpinResponse>(spinController, spinRequest)
      }
    }
  }
}