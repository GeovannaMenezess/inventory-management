import { useNavigate, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'

function ProductList() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')  //Buscar produto

  function fetchProducts() {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }
   useEffect(() => {
    fetchProducts()
  }, [location])

  //Deletar Produto
  async function deleteProduct(id: string) {
    await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    })
    setProducts(products.filter((p: any) => p.id !== id))
  }


  return (
    <div>
      <h1>Inventário</h1>
      <div>
        <button onClick={() => navigate('/adicionar')}>Adicionar</button>
      </div>
      <input
       type="text"
       placeholder= "Buscar Produtos"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products
          .filter((product: any) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
          .map((product: any) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <button onClick={() => navigate(`/editar/${product.id}`)}>Editar</button>
                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default ProductList