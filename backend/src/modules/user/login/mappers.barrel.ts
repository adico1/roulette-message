import { UserEntityToModelMapper } from "./user.entity-to-model.mapper";
import { UserModelToEntityMapper } from "./user.model-to-entity.mapper";
import { RoulettePlayerModelToEntityMapper } from "./roulette-player.model-to-entity.mapper";

const userEntityToModelMapper = new UserEntityToModelMapper();
const userModelToEntityMapper = new UserModelToEntityMapper();
const roulettePlayerModelToEntityMapper = new RoulettePlayerModelToEntityMapper();

export {
  userEntityToModelMapper,
  userModelToEntityMapper,
  roulettePlayerModelToEntityMapper
}
