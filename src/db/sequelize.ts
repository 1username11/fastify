import { Sequelize, DataTypes, literal } from 'sequelize';

const sequelize = new Sequelize('postgresfastify', 'postgresfastify', 'adminfastify', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: literal('gen_random_uuid()'),
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

export default User;
