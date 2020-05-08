import { UserRepo } from "./user.repo";
import { RoulettePlayerRepo } from "./roulette-player.repo";
import { RouletteMessageRepo } from "./roulette-message.repo";

const userRepo = new UserRepo();
const roulettePlayerRepo = new RoulettePlayerRepo();
const rouletteMessageRepo = new RouletteMessageRepo();
export {
  userRepo,
  roulettePlayerRepo,
  rouletteMessageRepo
}
