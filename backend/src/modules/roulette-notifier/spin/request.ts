import { IRequest } from "../../../core/abstract/request.interface";

export interface SpinRequest extends IRequest { 
  message: string;
}