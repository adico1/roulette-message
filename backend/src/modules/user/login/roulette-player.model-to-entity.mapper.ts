import {RoulettePlayer} from '../../../core/models/roulette-player';
import {RoulettePlayerEntity} from '../../../data/models/roulette-player.entity';

export class RoulettePlayerModelToEntityMapper {
  map(user: RoulettePlayer): RoulettePlayerEntity {
    return RoulettePlayerEntity.create(user.userId, user.nodeId, user.socketId);
  }
}