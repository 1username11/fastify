import { UserAttributes } from '../../db/models/user';

export interface ICreateUserDto {
  firstName: string,
  lastName?: string
}

export interface IUserDto extends UserAttributes {}
