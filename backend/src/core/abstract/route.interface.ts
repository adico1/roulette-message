import { ApiRoute } from "../../api-routes";

export interface IRoute {
  prepRoute(eventName: string, socketId: string, nodeId: number): ApiRoute
}