import { LoginController } from "./controller";
import { LoginUseCase } from "./usecase";


const loginUsecase = new LoginUseCase();
const loginController = new LoginController(loginUsecase);

export {
  loginController,
}
