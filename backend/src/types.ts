export interface IMessage {
  message: string;
}

export interface SpinClientDto extends IMessage {
}

export interface BlastClientDto extends IMessage {
}

export interface WildClientDto extends IMessage {
  number_of_random_users: number;
}

export interface LoginClientDto {
  email: string;
  password: string;
}

export interface LogoutClientDto {
}

export interface RegisterClientDto extends LoginClientDto {
  name: string;
}

