import { BlastRequest } from "./request";
import { BlastResponse } from "./response";
import { RouletteMessage } from "../../../core/models/roulette-message";
import { rouletteMessageRepo } from "../../../data/repos";
import { rouletteMessageModelToEntityMapper } from "../mappers/mappers.barrel";

export class BlastUseCase {
  async exec(request: BlastRequest): Promise<BlastResponse> {
    console.log(`[server][BlastUseCase][exec]`, JSON.stringify(request));
    const rouletteMessage = 
      RouletteMessage.create(request.message, '*');
    
    const rouletteMessageEntity = rouletteMessageModelToEntityMapper.map(rouletteMessage);
    await rouletteMessageRepo.save(rouletteMessageEntity);
    return {status: 200, message: 'OK'} as BlastResponse
  }
}