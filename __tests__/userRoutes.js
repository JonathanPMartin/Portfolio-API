const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='
const wrongpass='Basic YWxpY2UyOlRlc3Qh'
describe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/User')
      .send({
        username: 'unique_112233',
        password: 'password'
      })
    expect(res.statusCode).toEqual(201)
  })
});
describe('get all users', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .get('/api/v1/User')
      .set('Authorization', admin)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toBeInstanceOf(Array);
  })
});

describe('Update User', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .put('/api/v1/User/3')
      .send({
       UserRole:'admin'
      })
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(201)
  })
});
describe('delete user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .del('/api/v1/User/3')
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(201)
  })
});