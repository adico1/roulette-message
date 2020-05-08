import { WildRequest } from "./request";
import { WildResponse } from "./response";
import { WildUseCase } from "./usecase";

export class WildController {
  usecase: WildUseCase;

  constructor(usecase: WildUseCase) {
    this.usecase = usecase;
  }

  public async exec(request: WildRequest): Promise<WildResponse> {
    console.log('[server][WildController]:', JSON.stringify(request));

    const response = await this.usecase.exec(request)
    return response as WildResponse;  
  }
}