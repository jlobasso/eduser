const request = require('supertest')
const app = require('../app')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        token: "f463407004d9a916c34eff244b8c0230912a441cf4ab15af51e8e5c85634a35f69ecc7b3a920f458b6941cc3057a2351acd1b6981fc301d218954a33064dd33a",
        username: "jlobasso",
        password: "123456",	
        first_name: "Jorge",
        last_name: "Lobasso",
        email: "jlobasso@gmail.com"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result')
  })
})


describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .get('/users')
        .send({
            
            
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('result')
    })
  })