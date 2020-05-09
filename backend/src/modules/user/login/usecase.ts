import { LoginRequest } from "./request";
import { LoginResponse } from "./response";
import { AuthenticationFailed } from "./error";
import { RoulettePlayer } from "../../../core/models/roulette-player";
import { userRepo, roulettePlayerRepo } from "../../../data/repos";
import { userEntityToModelMapper, roulettePlayerModelToEntityMapper } from "./mappers.barrel";
import { connectedSockets } from "../../../ConnectedSockets";

export class LoginUseCase {
  async exec(request: LoginRequest): Promise<LoginResponse> {
    const userEntity = (await userRepo.getByEmail(request.email))[0];
    const user = userEntityToModelMapper.map(userEntity);
    
    if( user.passwordMatch(request.email) ) {
      throw new AuthenticationFailed()
    }

    request.userId = user.userId;
    connectedSockets.login(request.socketId, request.userId);

    const roulettePlayer = 
      RoulettePlayer.create(user, request.nodeId, request.socketId);
    
      const roulettePlayerEntity = roulettePlayerModelToEntityMapper.map(roulettePlayer);
      console.log(`[server][LoginUseCase][exec]`, JSON.stringify(roulettePlayerEntity));
    await roulettePlayerRepo.save(roulettePlayerEntity);
    return {status: 200, message: 'OK'} as LoginResponse;
  }
}