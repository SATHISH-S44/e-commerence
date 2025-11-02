import { useState } from 'react';
import { useProducts } from '../context/ProductContext';

function AddProductModal({ isOpen, onClose }) {
  const { addProduct } = useProducts();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // In production, use environment variables

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
    };

    addProduct(newProduct);
    handleClose();
  };

  const handleClose = () => {
    setPassword('');
    setIsAuthenticated(false);
    setFormData({ name: '', description: '', price: '', image: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full my-8 max-h-[90vh] flex flex-col animate-slideUp">
        {!isAuthenticated ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Access Required</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Enter Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4 animate-shake">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 font-medium"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 active:scale-95 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} id="addProductForm">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                    placeholder="Enter price in rupees"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  />
                  <p className="text-gray-500 text-xs mt-1">Optional - Leave blank for default image</p>
                </div>

                {formData.image && (
                  <div className="mb-4 animate-fadeIn">
                    <label className="block text-gray-700 mb-2">Image Preview</label>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover transition-opacity duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/500?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}

                {error && <p className="text-red-500 text-sm mb-4 animate-shake">{error}</p>}
              </form>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <button
                  type="submit"
                  form="addProductForm"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 font-medium"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 active:scale-95 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddProductModal;
