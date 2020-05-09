import { RegisterController } from "./controller";
import { RegisterUseCase } from "./usecase";
import { UserRepo } from "../../../data/repos/user.repo";

const userRepo = new UserRepo();
const registerUsecase = new RegisterUseCase(userRepo);
const registerController = new RegisterController(registerUsecase);

export {
  registerController,
}
