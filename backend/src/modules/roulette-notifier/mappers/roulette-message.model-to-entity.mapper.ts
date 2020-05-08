import {RouletteMessage} from '../../../core/models/roulette-message';
import {RouletteMessageEntity} from '../../../data/models/roulette-message.entity';

export class RouletteMessageModelToEntityMapper {
  map(model: RouletteMessage): RouletteMessageEntity {
    return model as RouletteMessageEntity;
  }
}