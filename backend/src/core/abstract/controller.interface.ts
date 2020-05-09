import { IRequest } from "./request.interface";
import { IResponse } from "./response.interface";

export interface IController {
  exec(request: IRequest): Promise<IResponse>;
}