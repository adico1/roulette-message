import {RoulettePlayer} from '../../../core/models/roulette-player';
import {RoulettePlayerEntity} from '../../../data/models/roulette-player.entity';

export class RoulettePlayerModelToEntityMapper {
  map(user: RoulettePlayer): RoulettePlayerEntity {
    return user as RoulettePlayerEntity;
  }
}