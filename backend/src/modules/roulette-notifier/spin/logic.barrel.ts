import { SpinController } from "./controller";
import { SpinUseCase } from "./usecase";


const spinUsecase = new SpinUseCase();
const spinController = new SpinController(spinUsecase);

export {
  spinController,
}
