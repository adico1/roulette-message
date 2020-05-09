import { IRequest } from "../../../core/abstract/request.interface";

export interface BlastRequest extends IRequest { 
  message: string;
}