const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='

describe('add a new purchase', () => {
  it('should add a new purchase', async () => {
    const res = await request(app.callback())
      .post('/api/v1/purchases')
      .send({
        currency: 'GBP',
        amount: '2050.4',
				DoP:"2022-04-27",
				 "portid":"2"
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
  })
});

describe('update purchase', () => {
  it('should update purchase', async () => {
    const res = await request(app.callback())
      .put('/api/v1/purchases/3')
      .send({
        currency: 'EUR',
        amount: '2050.4',
				DoP:"2022-04-27",
				 "portid":"1"
      })
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(201)
  })
});

describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
  })
});

describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('get purchases of port id', () => {
  it('get purchases of port id', async () => {
    const res = await request(app.callback())
      .get('/api/v1/purchases/port/2')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('delete purchase', () => {
  it('delete purchase by id', async () => {
    const res = await request(app.callback())
      .del('/api/v1/purchases/4')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
  })
});
