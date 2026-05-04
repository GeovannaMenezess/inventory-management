import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { number } from 'zod'

function ProductForm() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock_quantity, setStock_quantity] = useState('')

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name)
          setDescription(data.description)
          setPrice(data.price)
          setStock_quantity(data.stock_quantity)
        })
    }
  }, [id])

  //Botão salvar

  const navigate = useNavigate()


  
  async function handleSubmit() {
    
   await fetch(`http://localhost:3000/products/${id}`, {
       method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : name,
        description : description,
        price : Number (price),
        stock_quantity : Number (stock_quantity)
      })
      
    })
    navigate('/')
  }
//Tentando fazer o botão Adicionar
  async function handleAdd() {
    await fetch(`http://localhost:3000/products` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : name,
        description : description,
        price : Number (price),
        stock_quantity : Number (stock_quantity)

      })

    })
    navigate('/')
  }

 return (
    <div>
      <h1>{id?  'Editar Produto' : 'Adicionar Produto'}</h1>
      <form>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Quantidade"
          value={stock_quantity}
          onChange={(e) => setStock_quantity(e.target.value)}
        />
        <button type="button" onClick={ id? handleSubmit : handleAdd}>Salvar</button>
      </form>
    </div>
  )
}

export default ProductForm