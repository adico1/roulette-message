import { UserRepo } from "./user.repo";
import { RoulettePlayerRepo } from "./roulette-player.repo";

const userRepo = new UserRepo();
const roulettePlayerRepo = new RoulettePlayerRepo();

export {
  userRepo,
  roulettePlayerRepo
}
