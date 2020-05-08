import { RouletteMessageModelToEntityMapper } from "./roulette-message.model-to-entity.mapper";
import { RoulettePlayerEntitiesToRecipientsMapper } from "./roulette-player.entity-to-recipient.mapper";

const rouletteMessageModelToEntityMapper = new RouletteMessageModelToEntityMapper();
//const roulettePlayerEntityToRecipientsMapper = new RoulettePlayerEntityToRecipientsMapper();
const roulettePlayerEntitiesToRecipientsMapper = new RoulettePlayerEntitiesToRecipientsMapper();

export {
  rouletteMessageModelToEntityMapper,
  //roulettePlayerEntityToRecipientsMapper,
  roulettePlayerEntitiesToRecipientsMapper
}
