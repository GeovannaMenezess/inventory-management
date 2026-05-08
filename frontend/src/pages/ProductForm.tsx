import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ProductForm() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock_quantity, setStock_quantity] = useState('')
  const [erro, setErro] = useState('')

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

  const navigate = useNavigate()

  async function handleSubmit() {

    if (!name) {
      setErro('Nome é obrigatório!')
      return
    }
    if (!price || Number(price) <= 0) {
      setErro('Preço deve ser um número positivo!')
      return
    }
    setErro('')

    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: Number(price),
        stock_quantity: Number(stock_quantity)
      })

    })
    navigate('/')
  }
  
  async function handleAdd() {

    if (!name) {
      setErro('Nome é obrigatório!')
      return
    }
    if (!price || Number(price) <= 0) {
      setErro('Preço deve ser um número positivo!')
      return
    }
    
    setErro('')

    await fetch(`http://localhost:3000/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: Number(price),
        stock_quantity: Number(stock_quantity)

      })

    })
    navigate('/')
  }

  return (
    <div className='formContainer'>
      <h1 className='titulo'>{id ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      <form className='form'>
        <input className='inputForm'
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className='inputForm'
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input className='inputForm'
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input className='inputForm'
          type="number"
          placeholder="Quantidade"
          value={stock_quantity}
          onChange={(e) => setStock_quantity(e.target.value)}
        />
        <button className='botaoSalvar' type="button" onClick={id ? handleSubmit : handleAdd}>Salvar</button>

        {erro && <p style={{color: 'black'}}>{erro}</p>}

      </form>
    </div>
  )
}

export default ProductForm