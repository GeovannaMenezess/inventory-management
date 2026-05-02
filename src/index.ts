import  express  from "express";
const app = express()

app.get('/', function (req, res) {
    res.send('servidor funcionando!')
})

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})