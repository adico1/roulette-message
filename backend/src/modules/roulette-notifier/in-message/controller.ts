import { InMessageRequest } from "./request";
import { InMessageResponse } from "./response";
import { InMessageUseCase } from "./usecase";

export class InMessageController {
  usecase: InMessageUseCase;

  constructor(usecase: InMessageUseCase) {
    this.usecase = usecase;
  }

  public async exec(request: InMessageRequest): Promise<InMessageResponse> {
    console.log('[server][InMessageController]:', JSON.stringify(request));

    return await this.usecase.exec(request)
  }
}