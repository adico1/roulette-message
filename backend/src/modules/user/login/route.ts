import { Route } from "../../../core/impl/route";
import { ApiRoute } from "../../../api-routes";
import { LoginClientDto } from "../../../types";
import { LoginRequest } from "./request";
import { LoginResponse } from "./response";
import { loginController } from "./logic.barrel";

export class LoginRoute extends Route {
  // send a message to a random user
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: string|LoginClientDto) => {
        console.log(`[api](${eventName}): %s %s`, JSON.stringify(s_m), socketId);
        
        let m: LoginClientDto = this.argumentToDtoMapper<LoginClientDto>(s_m);

        const loginRequest = {
          ...m,
          socketId: socketId,
          nodeId: nodeId
        } as LoginRequest;

        this.execute<LoginRequest, LoginResponse>(loginController, loginRequest)
      }
    }
  }
}