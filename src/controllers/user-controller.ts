import User from '../db/models/user';
import { IUserService } from '../servises/user-servise';
import { ICreateUserDto, IUserDto } from '../types/dto/user';

export interface IUserController {
  getAllUsers(): Promise<User[]>
  createUser(req: any) : Promise<IUserDto>
  updateUser(req: any) : Promise<void>
  deleteUserById(req: any) : Promise<void>
}

class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await User.findAll();

    return users;
  }

  async createUser(req: any): Promise<IUserDto> {
    try {
      return await this.userService.create(req.body);
    } catch (error) {
      throw new Error('oops');
    }
  }

  async updateUser(req: any): Promise<void> {
    try {
      await this.userService.updateUserById(req.body, req.params.id);
    } catch (error) {
      console.log(error);

      throw new Error('oops');
    }
  }

  async deleteUserById(req: any):Promise<void> {
    try {
      await this.userService.deleteUserById(req.params.id);
    } catch (error) {
      throw new Error('oops');
    }
  }
}

export function getUserController(userService: IUserService): IUserController {
  return new UserController(userService);
}
