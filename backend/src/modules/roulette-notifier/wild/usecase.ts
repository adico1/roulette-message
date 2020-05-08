import { WildRequest } from "./request";
import { WildResponse } from "./response";
import { RouletteMessage } from "../../../core/models/roulette-message";
import { rouletteMessageRepo, roulettePlayerRepo } from "../../../data/repos";
import { rouletteMessageModelToEntityMapper, roulettePlayerEntitiesToRecipientsMapper } from "../mappers/mappers.barrel";

export class WildUseCase {
  async exec(request: WildRequest): Promise<WildResponse> {
    console.log(`[server][WildUseCase][exec]`, JSON.stringify(request));

    const randomRoulettePlayerEntity = await roulettePlayerRepo.getXRandom(request.x);
    const recipient = roulettePlayerEntitiesToRecipientsMapper.map(randomRoulettePlayerEntity);
    const rouletteMessage = 
      RouletteMessage.create(request.message, JSON.stringify(recipient));
    
    const rouletteMessageEntity = rouletteMessageModelToEntityMapper.map(rouletteMessage);
    return (await rouletteMessageRepo.save(rouletteMessageEntity)) as WildResponse;
  }
}