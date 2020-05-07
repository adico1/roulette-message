import { SpinRequest } from "./request";
import { SpinResponse } from "./response";

export class SpinController {
  public exec(msg: SpinRequest): Promise<SpinResponse> {
    return new Promise((resolve, reject) => {
      console.log('[server][SpinController]:', msg.message)
      resolve({message: msg.message} as SpinResponse);
    }); 
  }
}