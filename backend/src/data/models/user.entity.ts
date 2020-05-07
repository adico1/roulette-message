export class UserEntity {
  user_id: number;
  name: string;
  email: string;
  password: string;

  constructor(userId: number, name: string, email: string, password: string) {
    this.user_id = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static create(userId: number, name: string, email: string, password: string) {
    return new UserEntity(userId, name, email, password);
  }
}