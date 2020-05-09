import { RouletteServiceEvent } from "./constants";
import { IView } from "./core/view/socket.response.view";
import { SpinRoute } from "./modules/roulette-notifier/spin/route";
import { WildRoute } from "./modules/roulette-notifier/wild/route";
import { BlastRoute } from "./modules/roulette-notifier/blast/route";
import { RegisterRoute } from "./modules/user/register/route";
import { LoginRoute } from "./modules/user/login/route";
import { LogoutRoute } from "./modules/user/logout/route";


export class ApiRoute {
  name: string;
  fn: Function;
}

export class Routes {
  view: IView;

  constructor(view: IView) {
    this.view = view;
  }

  getApiRoutes(socketId: string, nodeId: number): ApiRoute[] {
    return [
      // send a message to a random user
      new SpinRoute(this.view).prepRoute(RouletteServiceEvent.SPIN, socketId, nodeId),
      // send a message to X random users
      new WildRoute(this.view).prepRoute(RouletteServiceEvent.WILD, socketId, nodeId),
      // broadcast a message to all users
      new BlastRoute(this.view).prepRoute(RouletteServiceEvent.BLAST, socketId, nodeId),
      // registration flow
      new RegisterRoute(this.view).prepRoute(RouletteServiceEvent.REGISTER, socketId, nodeId),
      // user login flow
      new LoginRoute(this.view).prepRoute(RouletteServiceEvent.LOGIN, socketId, nodeId),
      // user logout flow 
      new LogoutRoute(this.view).prepRoute(RouletteServiceEvent.LOGOUT, socketId, nodeId),   
      // disconnect flow
      new LogoutRoute(this.view).prepRoute(RouletteServiceEvent.DISCONNECT, socketId, nodeId),
    ]
  }
}