import { SpinController } from "./modules/roulette-notifier/spin/controller";
import { SpinRequest } from "./modules/roulette-notifier/spin/request";
import { SpinResponse } from "./modules/roulette-notifier/spin/response";
import { RouletteServiceEvent } from "./constants";
import { SpinClientDto, RegisterClientDto, LoginClientDto, LogoutClientDto, BlastClientDto, WildClientDto } from "./types";
import { IView } from "./core/view/socket.view";
import { RegisterController } from "./modules/user/register/controller";
import { RegisterRequest } from "./modules/user/register/request";
import { RegisterResponse } from "./modules/user/register/response";
import { RegisterUseCase } from "./modules/user/register/usecase";
import { UserRepo } from "./data/repos/user.repo";
import { LoginController } from "./modules/user/login/controller";
import { LoginUseCase } from "./modules/user/login/usecase";
import { LoginRequest } from "./modules/user/login/request";
import { LoginResponse } from "./modules/user/login/response";

import { LogoutController } from "./modules/user/logout/controller";
import { LogoutUseCase } from "./modules/user/logout/usecase";
import { LogoutRequest } from "./modules/user/logout/request";
import { LogoutResponse } from "./modules/user/logout/response";
import { connectedSockets } from './ConnectedSockets';
import { BlastController } from "./modules/roulette-notifier/blast/controller";
import { BlastRequest } from "./modules/roulette-notifier/blast/request";
import { BlastResponse } from "./modules/roulette-notifier/blast/response";
import { BlastUseCase } from "./modules/roulette-notifier/blast/usecase";
import { SpinUseCase } from "./modules/roulette-notifier/spin/usecase";
import { WildController } from "./modules/roulette-notifier/wild/controller";
import { WildUseCase } from "./modules/roulette-notifier/wild/usecase";
import { WildRequest } from "./modules/roulette-notifier/wild/request";
import { WildResponse } from "./modules/roulette-notifier/wild/response";


export class ApiRoute {
  name: string;
  fn: Function;
}

export class Routes {
  view: IView;

  constructor(view: IView) {
    this.view = view;
  }

  // send a message to a random user
  prepSpinRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: SpinClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        if (!connectedSockets.isLoggedIn(socketId)) {
          this.view.render({status: 401, message: 'Authorization Error'});
          return;
        }
        
        const spinController = new SpinController(new SpinUseCase());
        const spinRequest = m as SpinRequest;

        spinController.exec(spinRequest).then((response: SpinResponse) => {
          this.view.render(response);
        });
      }
    }
  }

  // send a message to a random user
  prepWildRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: WildClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        if (!connectedSockets.isLoggedIn(socketId)) {
          this.view.render({status: 401, message: 'Authorization Error'});
          return;
        }
        
        const wildController = new WildController(new WildUseCase());
        const wildRequest = m as WildRequest;

        wildController.exec(wildRequest).then((response: WildResponse) => {
          this.view.render(response);
        });
      }
    }
  }

  // send a message to a random user
  prepBlastRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: BlastClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        if (!connectedSockets.isLoggedIn(socketId)) {
          this.view.render({status: 401, message: 'Authorization Error'});
          return;
        }
        
        const blastController = new BlastController(new BlastUseCase());
        const blastRequest = m as BlastRequest;

        blastController.exec(blastRequest).then((response: BlastResponse) => {
          this.view.render(response);
        });
      }
    }
  }

  // simple user registration flow
  prepRegisterRoute(eventName: string): ApiRoute {
    return {
      name: eventName,
      fn: (m: RegisterClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        const registerController = 
          new RegisterController(
            new RegisterUseCase( 
              new UserRepo() 
        ));

        const registerRequest = m as RegisterRequest;

        registerController.exec(registerRequest).then((response: RegisterResponse) => {
          this.view.render(response);
        }).catch( err => {
          this.view.render(err);
        });
      }
    }
  }

  // simple user login flow
  prepLoginRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: LoginClientDto) => {
        console.log(`[api](${eventName}): %s %s`, JSON.stringify(m), socketId);
  
        const loginController = 
          new LoginController(
            new LoginUseCase());

        const loginRequest = {
          ...m,
          socketId: socketId,
          nodeId: nodeId
        } as LoginRequest;

        console.log(`[server][prepLoginRoute]`, JSON.stringify(loginRequest));
        loginController.exec(loginRequest).then((response: LoginResponse) => {
          this.view.render(response);
        }).catch( err => {
          this.view.render(err);
        });
      }
    }
  }

  // simple user login flow
  prepLogoutRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: LogoutClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        const logoutController = 
          new LogoutController(
            new LogoutUseCase());

        const logoutRequest = {
          ...m,
          socketId: socketId,
          nodeId: nodeId
        } as LogoutRequest;

        console.log(`[server][prepLogoutRoute]`, JSON.stringify(logoutRequest));
        logoutController.exec(logoutRequest).then((response: LogoutResponse) => {
          this.view.render(response);
        }).catch( err => {
          this.view.render(err);
        });
      }
    }
  }

  // disconnect
  prepDisconnectRoute(eventName: string, socketId: string, nodeId: number): ApiRoute {
    return {
      name: eventName,
      fn: (m: LogoutClientDto) => {
        console.log(`[api](${eventName}): %s`, JSON.stringify(m));
  
        if( connectedSockets.isLoggedIn(socketId) ) {
          const logoutController = 
          new LogoutController(
            new LogoutUseCase());

          const logoutRequest = {
            ...m,
            socketId: socketId,
            nodeId: nodeId
          } as LogoutRequest;

          console.log(`[server][prepLogoutRoute]`, JSON.stringify(logoutRequest));
          logoutController.exec(logoutRequest).then((response: LogoutResponse) => {
            this.view.render(response);
          }).catch( err => {
            this.view.render(err);
          });
        }
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