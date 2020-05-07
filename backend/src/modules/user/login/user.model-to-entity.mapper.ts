import { UserEntity } from "../../../data/models/user.entity";
import { User } from "../../../core/models/user";

export class UserModelToEntityMapper {
  map(user: User): UserEntity {
    const userEntity = UserEntity.create(
      user.userId,
      user.name,
      user.email,
      user.password
    );
    return userEntity;
  }
}