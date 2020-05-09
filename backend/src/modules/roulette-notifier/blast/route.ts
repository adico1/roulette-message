import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { BlastClientDto } from "../../../types";
import { BlastRequest } from "./request";
import { BlastResponse } from "./response";
import { blastController } from "./logic.barrel";

export class BlastRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: BlastClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));
  
        if (this.notAuthorized(socketId)) {
          return;
        }
        
        let m: BlastClientDto = this.argumentToDtoMapper<BlastClientDto>(s_m);
        const blastRequest = m as BlastRequest;

        this.execute<BlastRequest, BlastResponse>(blastController, blastRequest)
      }
    }
  }
}