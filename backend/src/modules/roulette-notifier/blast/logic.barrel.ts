import { BlastController } from "./controller";
import { BlastUseCase } from "./usecase";


const blastUsecase = new BlastUseCase();
const blastController = new BlastController(blastUsecase);

export {
  blastController,
}
