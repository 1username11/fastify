import { fastify } from 'fastify';
import User from './db/sequelize';

const server = fastify({
  logger: true,
});

server.post('/user', async (req, reply) => {
  const userData = req.body as {id: number, firstName: string, lastName?: string};
  const user = await User.create(userData);


  // await user.
  return user;
});

server.get('/', async (req, reply) => {
  const users = await User.findAll();

  return users;
});

server.listen({ port: 3000 }, async (err, address) => {
  await User.sync({ force: true });

  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
