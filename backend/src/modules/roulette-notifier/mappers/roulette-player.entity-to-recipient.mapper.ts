import { RoulettePlayerEntity } from '../../../data/models/roulette-player.entity';
import { Recipients } from '../models/recipients';

// export class RoulettePlayerEntityToRecipientsMapper {
//   map(entities: RoulettePlayerEntity[]): Recipients {
//     const entity = entities[0];
//     const result: Recipients = {};
//     result[`${entity.node_id}`] = [entity.socket_id];
//     return result;
//   }
// }

export class RoulettePlayerEntitiesToRecipientsMapper {
  map(entities: RoulettePlayerEntity[]): Recipients {
    const result: Recipients = {};
    entities.forEach(entity=> {
      result[`${entity.node_id}`] = [entity.socket_id];
    });
    return result;
  }
}