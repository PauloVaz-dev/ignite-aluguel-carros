import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { uuid } from 'uuidv4';

import { app } from '@shared/infra/http/app';

let connection: Connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.dropDatabase();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('123456', 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'psgvaz@gmail.com', '${password}', true, 'now()', 'xxxxxx')`,
    );
  });

  afterAll(async () => {
    connection.dropDatabase();
    connection.close();
  });
  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'psgvaz@gmail.com',
      password: '123456',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'New category',
        description: 'category01',
      })
      .set({
        Authorization: `Bearer: ${token}`,
      });

    expect(response.status).toBe(201);
  });
});
