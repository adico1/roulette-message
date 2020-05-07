import { Db } from "../db";
import { RoulettePlayerEntity } from "../models/roulette-player.entity";

export class RoulettePlayerRepo {
  async save(roulettePlayer: RoulettePlayerEntity) {
    console.log(`[server][RoulettePlayerRepo][save]`, JSON.stringify(roulettePlayer));
    const query = `INSERT INTO roulette_players (user_id, node_id, socket_id) \
VALUES (${roulettePlayer.userId}, ${roulettePlayer.nodeId}, '${roulettePlayer.socketId}');`;
    console.log('[RoulettePlayerRepo][save] query: ', query);

    return await new Db().exec(query);
  }

  async getById(userId: number) {
    const query = `SELECT * FROM roulette_players \
                   WHERE user_id=${userId};`;
    console.log('[RoulettePlayerRepo][getById] query: ', query);

    return await new Db().exec(query);
  }

  async getOneRandom() {
    const query = 
`SELECT * FROM roulette_players
ORDER BY RAND ( )
LIMIT 1;`;

    console.log('[RoulettePlayerRepo][getOneRandom] query: ', query);

    return await new Db().exec(query);
  }

  async getXRandom(x:number) {
    const query = 
`SELECT * FROM roulette_players
ORDER BY RAND ( )
LIMIT ${x};`;

    console.log('[RoulettePlayerRepo][getXRandom] query: ', query);

    return await new Db().exec(query);
  }

  async deleteById(userId:number, nodeId:number, socketId: string) {
    const query = 
`DELETE FROM roulette_players
WHERE user_id=${userId} and node_id=${nodeId} and socket_id='${socketId}'`;

    console.log('[RoulettePlayerRepo][deleteById] query: ', query);

    return await new Db().exec(query);
  }

}