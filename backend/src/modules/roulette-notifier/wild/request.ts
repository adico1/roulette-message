import { IRequest } from "../../../core/abstract/request.interface";

export interface WildRequest extends IRequest { 
  message: string;
  x: number;
}