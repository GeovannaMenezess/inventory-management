import { z } from 'zod'
import 'dotenv/config'
import  express  from "express";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "./generated/prisma/client";

const app = express()
app.use(express.json())

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.number().positive("Preço deve ser positivo"),
  stock_quantity: z.number().int().min(0).default(0)
})

// Testando o get
// app.get('/', function (req, res) {
//     res.send('servidor funcionando!')
// })

app.get('/products', async (req, res) => {
    const product = await prisma.product.findMany()
    res.json(product)
})

app.get( '/products/:id', async (req, res) => {
    const productId = req.params.id

    const product = await prisma.product.findFirst ({
        where: {
            id: productId
        }
    })

    res.json(product)
})

app.post( '/products', async (req, res) => {
    try {
        const data = productSchema.parse(req.body)
    
    const product = await prisma.product.create({
       data: data  
    })
    res.json(product)
    } catch (error) {
        res.status(400).json({error: error})
    }
    
})

app.put('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const data = productSchema.partial().parse(req.body)

        const product = await prisma.product.update({
            where: {id: id},
            data: data       
        })

        res.json(product)

    } catch (error) {
    res.status(400).json({ error: String(error) })
    }
})

app.delete('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
    
        const product = await prisma.product.delete({
            where: {id: id},
        })
        res.json(product)
    } catch (error) {
        res.status(400).json({ error: String(error) })
    }
})

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})