import { RegisterRequest } from "./request";
import { RegisterResponse } from "./response";
import { RegisterUseCase } from "./usecase";

export class RegisterController {
  usecase: RegisterUseCase;

  constructor(usecase: RegisterUseCase) {
    this.usecase = usecase;
  }

  public exec(request: RegisterRequest): Promise<RegisterResponse> {
    return new Promise(async(resolve, reject) => {
      console.log('[server][RegisterController]:', JSON.stringify(request));

      try {
        const response = await this.usecase.exec(request)
        resolve(response as RegisterResponse);  
      } catch( err ) {
        reject(err);
      }
    }); 
  }
}