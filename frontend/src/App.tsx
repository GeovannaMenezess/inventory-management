import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductForm from './pages/ProductForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/adicionar" element={<ProductForm />} />
        <Route path="/editar/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App