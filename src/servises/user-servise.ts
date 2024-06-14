import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { IUserRepo } from '../repos/user-repo';
import { ICreateUserDto, IUserDto } from '../types/dto/user';
import User from '../db/models/user';

export interface IUserService {
  create (createUserDto: ICreateUserDto): Promise<IUserDto>
  updateUserById (updareUserDto: Partial<IUserDto>, id: string): Promise<void>
  deleteUserById (userId: string): Promise<void>
}

class UserService implements IUserService {
  constructor(private userRepo: IUserRepo) {}

  async create(createUserDto: ICreateUserDto): Promise<IUserDto> {
    return this.userRepo.create(createUserDto);
  }

  async updateUserById(updateUserDto: Partial<IUserDto>, id: string): Promise<void> {
    const res = this.userRepo.updateById(updateUserDto, id);

    if (!res) throw new Error('update failed');
  }

  async deleteUserById(userId: string): Promise<void> {
    return this.userRepo.delete(userId);
  }
}

export function getUserService(userRepo: IUserRepo): IUserService {
  return new UserService(userRepo);
}
