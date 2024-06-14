import {
  Table, Model, Column, DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'user',
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
  })
  declare lastName?: string;
}

export default User;
