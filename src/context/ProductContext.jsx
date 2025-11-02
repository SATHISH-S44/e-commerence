import { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products.json';

const ProductContext = createContext();

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // Try to load products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    return initialProducts;
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Generate unique ID
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => 
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const value = {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
