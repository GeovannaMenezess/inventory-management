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
      <div className='buscarProdutos'>
      <div className='inputContainer'>
      <i className="fa-solid fa-magnifying-glass icone-lupa"></i>
      <input className='campoDeBusca'
       type="text"
       placeholder= "Buscar Produtos"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       />
       </div>
       </div>
       <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th><button className='botaoAdicionar' onClick={() => navigate('/adicionar')}>+</button></th>
          </tr>
        </thead>
        <tbody className='table'>
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
                <div style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
                <button className='botaoEditar' onClick={() => navigate(`/editar/${product.id}`)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                
                <button className='botaoExcluir' onClick={() => deleteProduct(product.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ProductList