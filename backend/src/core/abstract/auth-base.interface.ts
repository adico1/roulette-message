import { IRequest } from "./request.interface";

export interface IAuthBase extends IRequest {
  email: string;
  password: string;
}