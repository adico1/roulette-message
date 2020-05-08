import { BlastRequest } from "./request";
import { BlastResponse } from "./response";
import { BlastUseCase } from "./usecase";

export class BlastController {
  usecase: BlastUseCase;

  constructor(usecase: BlastUseCase) {
    this.usecase = usecase;
  }

  public async exec(request: BlastRequest): Promise<BlastResponse> {
    console.log('[server][BlastController]:', JSON.stringify(request));

    const response = await this.usecase.exec(request)
    return response as BlastResponse;  
  }
}