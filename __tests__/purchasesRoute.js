const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='
const NotAuth='Basic RGF2ZTpUZXN0'
const NotUser="NOT A USER";
describe('add a new purchase', () => {
  it('should add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 'GBP',
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":2
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
  })
});
describe('Test Cleaning', () => {
  it('should not add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 'GBP   ',
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":2
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(401)
  })
});
describe('Test wrong data', () => {
  it('should not add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 3,
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":2
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(400)
  })
});
describe('Test Auth', () => {
  it('should add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 'GBP',
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":2
      })
			.set('Authorization', NotAuth)
    expect(res.statusCode).toEqual(401)
  })
});
describe('Test User Check', () => {
  it('should add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 'GBP',
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":"2"
      })
			.set('Authorization', NotUser)
    expect(res.statusCode).toEqual(401)
  })
});
describe('test wrong route', () => {
  it('throws an error cuz wrong data', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/not')
    expect(res.statusCode).toEqual(404)
  })
});
describe('update purchase', () => {
  it('should update purchase', async () => {
    const res = await request(app.callback())
      .put('/api/v1/purchases/3')
      .send({
        currency: 'EUR',
        amount: 2050.4,
				DoP:"2022-04-27",
				 "portid":"1"
      })
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(200)
  })
});

describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
  })
});

describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('delete purchase', () => {
  it('delete purchase by id', async () => {
    const res = await request(app.callback())
      .del('/api/v1/purchases/4')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
  })
});
