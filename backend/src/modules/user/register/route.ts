import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { RegisterClientDto } from "../../../types";
import { RegisterRequest } from "./request";
import { RegisterResponse } from "./response";
import { registerController } from "./logic.barrel";

export class RegisterRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: RegisterClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));

        let m: RegisterClientDto = this.argumentToDtoMapper<RegisterClientDto>(s_m);
        const registerRequest = m as RegisterRequest;

        this.execute<RegisterRequest, RegisterResponse>(registerController, registerRequest)
      }
    }
  }
}