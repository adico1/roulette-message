import { WildController } from "./controller";
import { WildUseCase } from "./usecase";


const wildUsecase = new WildUseCase();
const wildController = new WildController(wildUsecase);

export {
  wildController,
}
