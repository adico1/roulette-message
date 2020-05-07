export class User {
  userId: number;
  name: string;
  email: string;
  password: string;

  constructor(userId: number, name: string, email: string, password: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static create(userId: number, name: string, email: string, password: string) {
    return new User(userId, name, email, password);
  }

  passwordMatch(password: string) {
    return this.password === password;
  }
}