const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='
const NotAuth='Basic RGF2ZTpUZXN0'
const NotUser="NOT A USER";
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
describe('Test Clean', () => {
  it('should not create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/User')
      .send({
        username: 'unique_112233   ',
        password: 'password'
      })
    expect(res.statusCode).toEqual(401)
  })
});
describe('Test wrong data', () => {
  it('should not create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/User')
      .send({
        username: 3,
        password: 'password'
      })
    expect(res.statusCode).toEqual(400)
  })
});
describe('test wrong route', () => {
  it('throws an error cuz wrong data', async () => {
    const res = await request(app.callback())
      .get('/api/v1/User/not')
    expect(res.statusCode).toEqual(404)
  })
});
describe('get all users', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .get('/api/v1/User')
      .set('Authorization', admin)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('Test Auth', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .get('/api/v1/User')
      .set('Authorization', NotAuth)
    expect(res.statusCode).toEqual(401)
   
  })
});
describe('Test user check', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .get('/api/v1/User')
      .set('Authorization', NotUser)
    expect(res.statusCode).toEqual(401)
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
    expect(res.statusCode).toEqual(200)
  })
});
describe('delete user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .del('/api/v1/User/3')
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(200)
  })
});