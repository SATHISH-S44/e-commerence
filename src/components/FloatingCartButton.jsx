import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function FloatingCartButton() {
  const { cartItems, getTotalPrice } = useCart();
  const location = useLocation();
  
  // Don't show on cart page or if cart is empty
  if (cartItems.length === 0 || location.pathname === '/cart') return null;

  return (
    <Link to="/cart">
      <div className="fixed bottom-6 right-6 z-40 group">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 active:scale-95 p-4 relative animate-bounce">
          {/* Cart Icon */}
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          
          {/* Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse">
            {cartItems.length}
          </span>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block animate-fadeIn">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <p className="text-sm font-semibold">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</p>
            <p className="text-xs text-gray-300">₹{getTotalPrice().toLocaleString('en-IN')}</p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FloatingCartButton;
