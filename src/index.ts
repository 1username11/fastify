import { FastifyInstance, fastify } from 'fastify';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import User from './db/models/user';
import { getConnection } from './db/sequelize';
import { getUserService } from './servises/user-servise';
import { getUserRepo } from './repos/user-repo';
import { getUserController } from './controllers/user-controller';

dotenv.config();

function registerRoutes(server: FastifyInstance): void {
  const userRepo = getUserRepo(server.db);
  const userService = getUserService(userRepo);
  const userController = getUserController(userService);

  server.post('/users', (req) => userController.createUser(req));

  server.get('/users', async () => {
    const users = await User.findAll();

    return users;
  });

  server.put('/users/:id', async (req) => userController.updateUser(req));

  server.delete('/users/:id', async (req) => userController.deleteUserById(req));
}

async function main(): Promise<void> {
  const server = fastify({
    logger: true,
  });

  server.decorate(
    'db',
    getConnection({
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'postgres',
      dialect: process.env.DB_DIALECT as Dialect || 'postgres',
    }),
  );

  // server.db.sync({ });

  registerRoutes(server);

  server.listen({ port: 3000 }, async (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}

main();
