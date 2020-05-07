import { RegisterRequest } from "./request";
import { UserEntity } from "../../../data/models/user.entity";
import { UserRepo } from "../../../data/repos/user.repo";
import { RegisterResponse } from "./response";

export class RegisterUseCase {
  userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }
  async exec(request: RegisterRequest): Promise<RegisterResponse> {
    const user = request as UserEntity;
    
    return (await this.userRepo.save(user)) as RegisterResponse;
  }
}