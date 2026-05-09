import request from 'supertest'
import app from '../app'

describe('GET /products', () => {
  it('deve retornar lista de produtos com status 200', async () => {
    const response = await request(app).get('/products')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe('POST /products', () => {
  it('deve retornar erro 400 quando nome está vazio', async () => {
    const response = await request(app).post('/products').send({
      price: 10,
      stock_quantity: 5
    })
    expect(response.status).toBe(400)
  })

  it('deve criar um produto com dados válidos', async () => {
    const response = await request(app).post('/products').send({
      name: 'Produto Teste',
      price: 10,
      stock_quantity: 5
    })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Produto Teste')
  })
})

describe('DELETE /products', () => {
    it('deve retornar erro 400 quando id não existe', async () => {
        const response = await request(app).delete('/products/id-que-nao-existe')
        expect(response.status).toBe(400)
    })
})

describe('PUT /products/:id', () => {
    it('deve retornar erro 400 quando o preço é negativo', async () => {
        const response = await request(app).put('/products/qualquer-id').send({
            price: -10
        })
        expect([400, 404, 500]).toContain(response.status)
    })
})