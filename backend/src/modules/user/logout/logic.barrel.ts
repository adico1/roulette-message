import { LogoutController } from "./controller";
import { LogoutUseCase } from "./usecase";


const logoutUsecase = new LogoutUseCase();
const logoutController = new LogoutController(logoutUsecase);

export {
  logoutController,
}
