import { SpinRequest } from "./request";
import { SpinResponse } from "./response";
import { SpinUseCase } from "./usecase";

export class SpinController {
  usecase: SpinUseCase;

  constructor(usecase: SpinUseCase) {
    this.usecase = usecase;
  }

  public async exec(request: SpinRequest): Promise<SpinResponse> {
    console.log('[server][SpinController]:', JSON.stringify(request));

    const response = await this.usecase.exec(request)
    return response as SpinResponse;  
  }
}