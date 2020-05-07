import { LogoutRequest } from "./request";
import { LogoutResponse } from "./response";
import { LogoutUseCase } from "./usecase";

export class LogoutController {
  usecase: LogoutUseCase;

  constructor(usecase: LogoutUseCase) {
    this.usecase = usecase;
  }

  public exec(request: LogoutRequest): Promise<LogoutResponse> {
    return new Promise(async(resolve, reject) => {
      console.log('[server][LogoutController]:', JSON.stringify(request));

      try {
        const response = await this.usecase.exec(request)
        resolve(response as LogoutResponse);  
      } catch( err ) {
        reject(err);
      }
    }); 
  }
}