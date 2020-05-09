import { IRoute } from "../abstract/route.interface";
import { IView } from "../view/socket.response.view";
import { connectedSockets } from "../../ConnectedSockets";
import { IRequest } from "../abstract/request.interface";
import { IResponse } from "../abstract/response.interface";
import { IController } from "../abstract/controller.interface";

export class Route implements IRoute {
  view: IView;

  constructor(view: IView) {
    this.view = view;
  }
  
  prepRoute(eventName: string, socketId: string, nodeId: number): import("../../api-routes").ApiRoute {
    throw new Error("Method not implemented.");
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
}