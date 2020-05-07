import { IAuthBase } from "../../../core/abstract/auth-base.interface";

export interface RegisterRequest extends IAuthBase { 
  name: string;
}