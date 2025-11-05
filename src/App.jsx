import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import FloatingCartButton from './components/FloatingCartButton';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <FloatingCartButton />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
