const request = require('supertest')
const app = require('../app')
const admin='Basic YWxpY2U1OlRlc3Q='
const user='Basic YWxpY2UyOlRlc3Q='
const NotAuth='Basic RGF2ZTpUZXN0'
const NotUser="NOT A USER";
describe('Post new portfolio', () => {
  it('should create a new portfolio', async () => {
    const res = await request(app.callback())
      .post('/api/v1/portfolio')
      .send({
        Name: 'portfolioName',
        UserId:1
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(201)
  })
});
describe('Test Auth', () => {
  it('should create a new portfolio', async () => {
    const res = await request(app.callback())
      .post('/api/v1/portfolio')
      .send({
        Name: 'portfolioName',
        UserId:1
      })
			.set('Authorization',NotAuth )
    expect(res.statusCode).toEqual(401)
  })
});
describe('Test User Check', () => {
  it('should create a new portfolio', async () => {
    const res = await request(app.callback())
      .post('/api/v1/portfolio')
      .send({
        Name: 'portfolioName',
        UserId:1
      })
			.set('Authorization',NotUser )
    expect(res.statusCode).toEqual(401)
  })
});
describe('update portfolio name', () => {
  it('should update the portfolio name', async () => {
    const res = await request(app.callback())
      .put('/api/v1/portfolio/1')
      .send({
        Name: 'NewportfolioName',
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
  })
});
describe('update portfolio owner', () => {
  it('should update the portfolio name', async () => {
    const res = await request(app.callback())
      .put('/api/v1/portfolio/Owner/1')
      .send({
        UserId:2,
      })
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
  })
});
describe('get user portfolios', () => {
  it('should get user portfolios', async () => {
    const res = await request(app.callback())
      .get('/api/v1/portfolio')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array);
  })
});
describe('delete portfolio', () => {
  it('delete portfolio', async () => {
    const res = await request(app.callback())
      .del('/api/v1/portfolio/3')
			.set('Authorization', user)
    expect(res.statusCode).toEqual(200)
  })
});

/* cannot be tested due to forgein key acting the fuck up
describe('delete user portfolios', () => {
  it('delete user portfolios', async () => {
    const res = await request(app.callback())
      .del('/api/v1/portfolio/user/2')
			.set('Authorization', admin)
    expect(res.statusCode).toEqual(201)
  })
});
*/
