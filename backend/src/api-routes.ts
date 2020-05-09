import { SpinRequest } from "./modules/roulette-notifier/spin/request";
import { SpinResponse } from "./modules/roulette-notifier/spin/response";
import { RouletteServiceEvent } from "./constants";
import { SpinClientDto, RegisterClientDto, LoginClientDto, LogoutClientDto, BlastClientDto, WildClientDto } from "./types";
import { IView } from "./core/view/socket.response.view";
import { RegisterRequest } from "./modules/user/register/request";
import { RegisterResponse } from "./modules/user/register/response";
import { LoginRequest } from "./modules/user/login/request";
import { LoginResponse } from "./modules/user/login/response";

import { LogoutRequest } from "./modules/user/logout/request";
import { LogoutResponse } from "./modules/user/logout/response";
import { connectedSockets } from './ConnectedSockets';
import { BlastController } from "./modules/roulette-notifier/blast/controller";
import { BlastRequest } from "./modules/roulette-notifier/blast/request";
import { BlastResponse } from "./modules/roulette-notifier/blast/response";
import { BlastUseCase } from "./modules/roulette-notifier/blast/usecase";
import { WildRequest } from "./modules/roulette-notifier/wild/request";
import { WildResponse } from "./modules/roulette-notifier/wild/response";
import { loginController } from "./modules/user/login/logic.barrel";
import { IController } from "./core/abstract/controller.interface";
import { IRequest } from "./core/abstract/request.interface";
import { IResponse } from "./core/abstract/response.interface";
import { logoutController } from "./modules/user/logout/logic.barrel";
import { registerController } from "./modules/user/register/logic.barrel";
import { spinController } from "./modules/roulette-notifier/spin/logic.barrel";
import { wildController } from "./modules/roulette-notifier/wild/logic.barrel";
import { blastController } from "./modules/roulette-notifier/blast/logic.barrel";


export class ApiRoute {
  name: string;
  fn: Function;
}

export class Routes {
  view: IView;

  constructor(view: IView) {
    this.view = view;
  }

  notAuthorized(socketId:string) {
    if (!connectedSockets.isLoggedIn(socketId)) {
      this.view.render({status: 401, message: 'Authorization Error'});
      return true;
    }
    return false;
  }

  argumentToDtoMapper<T>(s_m: string|T): T {
    let m: T;
    if (typeof s_m === 'string') {
      m = JSON.parse(s_m) as T;
    } else {
      m = s_m as T;
    }
    return m;
  }

  execute<REQ extends IRequest, RES extends IResponse>(controller: IController, request: REQ) {
    console.log(`[server][api-routes][execute]`, JSON.stringify(request));
    controller.exec(request).then((response: RES) => {
      this.view.render(response);
    }).catch( (err: any) => {
      this.view.render(err);
    });
  }
  
  // send a message to a random user
  prepSpinRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
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

  // send a message to a random user
  prepWildRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: WildClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));
  
        if (this.notAuthorized(socketId)) {
          return;
        }
        
        let m: SpinClientDto = this.argumentToDtoMapper<SpinClientDto>(s_m);
        const wildRequest = m as WildRequest;

        this.execute<WildRequest, WildResponse>(wildController, wildRequest)
      }
    }
  }

  // send a message to a random user
  prepBlastRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
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

  // simple user registration flow
  prepRegisterRoute(eventName: string): ApiRoute {
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

  // simple user login flow
  prepLoginRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
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

  // simple user login flow
  prepLogoutRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (s_m: string|LogoutClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(s_m));
  
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

  // disconnect
  prepDisconnectRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: LogoutClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        if( !connectedSockets.isLoggedIn(socketId) ) {
          return;
        }

        const logoutRequest = {
          ...m,
          socketId: socketId,
          nodeId: nodeId
        } as LogoutRequest;

        this.execute<LogoutRequest, LogoutResponse>(logoutController, logoutRequest)
      }
    }
  }

  getApiRoutes(socketId: string, nodeId: number): ApiRoute[] {
    return [
      this.prepSpinRoute(RouletteServiceEvent.SPIN, socketId, nodeId),
      this.prepWildRoute(RouletteServiceEvent.WILD, socketId, nodeId),
      this.prepBlastRoute(RouletteServiceEvent.BLAST, socketId, nodeId),
      this.prepRegisterRoute(RouletteServiceEvent.REGISTER),
      this.prepLoginRoute(RouletteServiceEvent.LOGIN, socketId, nodeId),
      this.prepLogoutRoute(RouletteServiceEvent.LOGOUT, socketId, nodeId),
      this.prepDisconnectRoute(RouletteServiceEvent.DISCONNECT, socketId, nodeId),
    ]
  }
}