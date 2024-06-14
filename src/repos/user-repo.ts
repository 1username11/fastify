import { Sequelize } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import User from '../db/models/user';
import { ICreateUserDto, IUserDto } from '../types/dto/user';

export interface IUserRepo {
  create (userData: ICreateUserDto): Promise<IUserDto>
  updateById (updatedUserData: Partial<IUserDto>, id: string): Promise<boolean>
  delete(userId: string): Promise<void>
}

class UserRepo implements IUserRepo {
  userModel: ModelCtor<User>;

  constructor(
    private db: Sequelize,
  ) {
    this.userModel = db.models.user as ModelCtor<User>;
  }

  async create(userDto: ICreateUserDto): Promise<IUserDto> {
    try {
      return await this.userModel.create(userDto, { returning: true });
    } catch (error) {
      throw new Error('db error');
    }
  }

  async updateById(updatedUserData: Partial<IUserDto>, id: string): Promise<boolean> {
    try {
      const [affectedCount] = await this.userModel.update(updatedUserData, {
        where: {
          id,
        },
        returning: false,
      });
      return Boolean(affectedCount);
    } catch (error) {
      throw new Error('Update error');
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await this.userModel.destroy({ where: { id: userId }, force: false });
    } catch (error) {
      throw new Error('Deleting fail');
    }
  }
}

export function getUserRepo(db: Sequelize): IUserRepo {
  return new UserRepo(db);
}
