console.log('node env', process.env.NODE_ENV);
module.exports = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: process.env.NODE_ENV === 'test' ? 'docker_test' : 'docker',
  entities: ['./src/modules/**/entities/*.ts'],
  synchronize: false,
  logging: false,

  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],

  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
