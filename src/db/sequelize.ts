import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import User from './models/user';

export function getConnection(options: Options): Sequelize {
  return new Sequelize({
    ...options,
    models: [User],
  });
}
