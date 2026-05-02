import 'dotenv/config'
import  express  from "express";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "./generated/prisma/client";

const app = express()
app.use(express.json())

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})


// Testando o get
// app.get('/', function (req, res) {
//     res.send('servidor funcionando!')
// })

app.get('/products', async (req, res) => {
    const product = await prisma.product.findMany()
    res.json(product)
})

app.post( '/products', async (req, res) => {
    const { name, description, price, stock_quantity} = req.body
    
    const product = await prisma.product.create({
       data: {
        name: name,
       description : description,
       price: price,
       stock_quantity: stock_quantity
       }
    })
    res.json(product)
})

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})