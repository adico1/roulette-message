import { Db } from "../db";
import { RouletteMessageEntity } from "../models/roulette-message.entity";

export class RouletteMessageRepo {
  async save(rouletteMessage: RouletteMessageEntity) {
    console.log(`[server][RouletteMessageRepo][save]`, JSON.stringify(rouletteMessage));
    const query = `INSERT INTO roulette_messages (content, recipients) \
VALUES ('${rouletteMessage.content}', '${rouletteMessage.recipients}');`;
    console.log('[RouletteMessageRepo][save] query: ', query);

    return await new Db().exec(query);
  }

  async deleteExpired() {
    const n=10;
    const n_min_ego = new Date(Date.now() - n * 1000);
    const query = 
`DELETE FROM roulette_messages
WHERE created_at<'${n_min_ego}'`;

    console.log('[RouletteMessageRepo][deleteById] query: ', query);

    return await new Db().exec(query);
  }

}