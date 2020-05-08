import { SpinRequest } from "./request";
import { SpinResponse } from "./response";
import { RouletteMessage } from "../../../core/models/roulette-message";
import { rouletteMessageRepo, roulettePlayerRepo } from "../../../data/repos";

import { 
  rouletteMessageModelToEntityMapper, 
  roulettePlayerEntitiesToRecipientsMapper 
} from "../mappers/mappers.barrel";

export class SpinUseCase {
  async exec(request: SpinRequest): Promise<SpinResponse> {
    console.log(`[server][SpinUseCase][exec]`, JSON.stringify(request));

    const randomRoulettePlayerEntity = await roulettePlayerRepo.getOneRandom();
    const recipient = roulettePlayerEntitiesToRecipientsMapper.map(randomRoulettePlayerEntity);
    console.log(`[server][SpinUseCase][exec]`, JSON.stringify(randomRoulettePlayerEntity));
    const rouletteMessage = 
      RouletteMessage.create(request.message, JSON.stringify(recipient));
    
    const rouletteMessageEntity = rouletteMessageModelToEntityMapper.map(rouletteMessage);
    return (await rouletteMessageRepo.save(rouletteMessageEntity)) as SpinResponse;
  }
}