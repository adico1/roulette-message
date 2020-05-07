import { UserEntity } from "../../../data/models/user.entity";
import { User } from "../../../core/models/user";

export class UserEntityToModelMapper {
  map(userEntity: UserEntity): User {
    const user = User.create(
      userEntity.user_id,
      userEntity.name,
      userEntity.email,
      userEntity.password
    );
    return user;
  }
}