import { UserEntity } from "../models/user.entity";
import { Db } from "../db";

export class UserRepo {
  async save(user: UserEntity) {
    const query = `INSERT INTO users (name, email, password) \
VALUES ('${user.name}', '${user.email}', '${user.password}');`;
    console.log('[UserRepo][save] query: ', query);

    return await new Db().exec(query);  
  }

  async getByEmail(email: string): Promise<UserEntity[]> {
    const query = `SELECT * FROM users \
                   WHERE email='${email}';`;
    console.log('[UserRepo][getByEmail] query: ', query);

    return await new Db().exec(query);
  }

  async getById(userId: number) {
    const query = `SELECT * FROM users \
                   WHERE user_id=${userId};`;
    console.log('[UserRepo][save] query: ', query);

    return await new Db().exec(query);
  }
}