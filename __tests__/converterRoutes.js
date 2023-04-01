const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='

//this is just here so that the test shit doesnt throw a fit
test('Jest should use the test DB', ()=> {
  expect(process.env.DB_DATABASE).toBe('test_db');
})

//un comment after all other routes are down
/*
describe('get current conversion in all currencies', () => {
  it('get current conversion in all currencies', async () => {
    const res = await request(app.callback())
      .get('/api/v1/Coverter')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Object);
  })
});
describe('currency convert', () => {
  it('covert currencies at current value', async () => {
    const res = await request(app.callback())
      .post('/api/v1/Coverter')
      .send({
        Cur1: 'GBP',
        Cur2: 'EUR',
				amount:2003.4
      })
    expect(res.statusCode).toEqual(201)
  })
});

describe('currency convert 2', () => {
  it('covert currencies at Historic value', async () => {
    const res = await request(app.callback())
      .post('/api/v1/Coverter/Date')
      .send({
        Cur1: 'GBP',
        Cur2: 'EUR',
				amount:2003.4,
				Date:"2012-03-23"
      })
    expect(res.statusCode).toEqual(201)
  })
});
describe('currency rate of change', () => {
  it('covert currencies at Historic value', async () => {
    const res = await request(app.callback())
      .post('/api/v1/Coverter/Change')
      .send({
        Cur: 'GBP',
				Date:"2012-03-23"
      })
    expect(res.statusCode).toEqual(201)
  })
});
*/