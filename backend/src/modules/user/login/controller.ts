import { LoginRequest } from "./request";
import { LoginResponse } from "./response";
import { LoginUseCase } from "./usecase";

export class LoginController {
  usecase: LoginUseCase;

  constructor(usecase: LoginUseCase) {
    this.usecase = usecase;
  }

  public exec(request: LoginRequest): Promise<LoginResponse> {
    return new Promise(async(resolve, reject) => {
      console.log('[server][LoginController]:', JSON.stringify(request));

      try {
        const response = await this.usecase.exec(request)
        resolve(response as LoginResponse);  
      } catch( err ) {
        reject(err);
      }
    }); 
  }
}